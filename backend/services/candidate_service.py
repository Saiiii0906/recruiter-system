import logging

from backend.services.data_loader import load_candidates

logger = logging.getLogger(__name__)


def get_candidate_by_id(candidate_id: str):

    print("\nSERVICE CALLED")

    df = load_candidates()

    candidate_id = candidate_id.strip().upper()

    if candidate_id.startswith("CAND_"):
        number = int(candidate_id.split("_")[1])
        candidate_id = f"CAND_{number:07d}"

    print("Searching:", candidate_id)

    for _, row in df.iterrows():

        current = str(row["candidate_id"]).strip().upper()

        print(current)

        if current == candidate_id:
            print("FOUND!")
            return row.to_dict()

    print("NOT FOUND")

    return None