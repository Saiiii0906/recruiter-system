import pandas as pd

from backend.scoring.batch_ranker import (
    rank_top_candidates
)


def rank_candidates_service(sample_df,jd_text,jd_features,top_n=10):
    results = rank_top_candidates(
        sample_df=sample_df,
        jd_text=jd_text,
        jd_features=jd_features,
        top_n=top_n
    )

    return results.to_dict(orient="records")