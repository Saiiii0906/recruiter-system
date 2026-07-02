import logging

from backend.services.data_loader import load_candidates

logger = logging.getLogger(__name__)


def get_all_candidates():
    df = load_candidates()

    candidates = []

    for _, row in df.iterrows():
        candidate = row.to_dict()

        profile = candidate.get("profile", {})

        candidate["candidate_id"] = candidate.get("candidate_id", "")
        candidate["name"] = profile.get("anonymized_name", "")
        candidate["current_role"] = profile.get("headline", "")

        candidates.append(candidate)

    return candidates


def get_candidate_by_id(candidate_id: str):
    df = load_candidates()

    for _, row in df.iterrows():

        candidate = row.to_dict()

        if str(candidate.get("candidate_id")) == str(candidate_id):

            profile = candidate.get("profile", {})

            candidate["name"] = profile.get("anonymized_name", "")
            candidate["current_role"] = profile.get("headline", "")

            return candidate

    return None