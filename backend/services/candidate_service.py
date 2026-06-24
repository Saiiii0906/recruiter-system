import logging

from backend.services.data_loader import (load_candidates)

logger = logging.getLogger(__name__)


def get_candidate_by_id(candidate_id: str):
    df = load_candidates()

    print("INPUT:", candidate_id)

    print("SAMPLE IDS:", df["candidate_id"].astype(str).head(10).tolist())

    print("TYPE:", type(df["candidate_id"].iloc[0]))

    candidate_id = candidate_id.strip().upper()

    if candidate_id.startswith("CAND_"):
        number = candidate_id.replace("CAND_", "")
        candidate_id = f"CAND_{int(number):06d}"

    print(
        "NORMALIZED:",
        candidate_id
    )

    candidate = df[
        df["candidate_id"].astype(str).str.strip()
        == candidate_id.strip()
    ]

    print(
        "MATCHING ROWS:",
        len(candidate)
    )

    if candidate.empty:
        return None

    return candidate.iloc[0].to_dict()