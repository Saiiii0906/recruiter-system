import logging

import pandas as pd
from backend.scoring.skill_matcher import (
    calculate_skill_match
)
from backend.scoring.final_ranking import (
    calculate_final_score
)
from backend.feature_engineering.candidate_features import (
    build_candidate_features
)

from backend.embeddings.sematic_similarity import (
    score_candidate
)

from backend.scoring.skill_matcher import (
    calculate_skill_match
)

logger = logging.getLogger(__name__)


def rank_top_candidates(
    sample_df: pd.DataFrame,
    jd_text: str,
    top_n: int = 10,
) -> pd.DataFrame:
    rows = []

    for _, row in sample_df.iterrows():
        candidate_id = row["candidate_id"]

        try:
            features = build_candidate_features(row)

            semantic_score = score_candidate(
                features["semantic_profile"],
                jd_text
            )

            skill_match_score = 0

            final_score = calculate_final_score(
                semantic_score=semantic_score,
                experience_years=features["experience_years"],
                behavior_score=features["behavior_score"],
                skill_match_score=skill_match_score
            )

            rows.append({
                "candidate_id": candidate_id,
                "semantic_score": semantic_score,
                "experience_years": features["experience_years"],
                "behavior_score": features["behavior_score"],
                "skill_count": features["skill_count"],
                "final_score": final_score
            })

        except Exception:
            logger.exception(
                "Skipping candidate %s — feature/scoring failure",
                candidate_id
            )
            continue

    ranked_df = pd.DataFrame(rows)
    ranked_df = ranked_df.sort_values("final_score", ascending=False).reset_index(drop=True)

    return ranked_df.head(top_n)