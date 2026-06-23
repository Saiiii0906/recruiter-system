from backend.services.data_loader import (
    load_candidates
)


def get_candidate_by_id(
    candidate_id: str
):
    df = load_candidates()

    candidate = df[
        df["candidate_id"] == candidate_id
    ]

    if candidate.empty:
        return None

    return candidate.iloc[0].to_dict()