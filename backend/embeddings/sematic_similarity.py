from __future__ import annotations

import logging
import numpy as np
from dataclasses import dataclass
from typing import Sequence

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from backend.embeddings.module_loader import get_model

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class SimilarityResult:
    candidate_id: str
    score: float          # 0–100
    raw_cosine: float     # [-1, 1], useful for debugging / calibration


def _encode(model: SentenceTransformer, text: str) -> np.ndarray:
    """Return a normalized 2-D embedding array shaped (1, dim)."""
    return model.encode([text], normalize_embeddings=True)


def score_candidate(candidate_text: str, jd_text: str) -> float:
    """
    Return a single similarity score in [0, 100].

    Args:
        candidate_text: Full candidate profile as a plain text blob.
        jd_text:        Full job description as a plain text blob.

    Returns:
        Float in [0, 100].  Higher = stronger semantic match.
    """
    model = get_model()
    candidate_vec = _encode(model, candidate_text)
    jd_vec = _encode(model, jd_text)

    cosine = float(cosine_similarity(candidate_vec, jd_vec)[0][0])
    # Clip negatives — they carry no meaningful signal for document-level text.
    score = max(0.0, cosine) * 100.0

    logger.debug("Cosine: %.4f  →  Score: %.2f", cosine, score)
    return round(score, 2)


def rank_candidates(
    candidates: Sequence[tuple[str, str]],
    jd_text: str,
) -> list[SimilarityResult]:
    """
    Score and rank a batch of candidates against a single JD.

    Args:
        candidates: List of (candidate_id, profile_text) tuples.
        jd_text:    Full job description text.

    Returns:
        List of SimilarityResult sorted by score descending.
    """
    if not candidates:
        return []

    model = get_model()

    jd_vec = _encode(model, jd_text)

    ids, texts = zip(*candidates)
    # Batch encode is significantly faster than encoding one-by-one.
    candidate_vecs = model.encode(list(texts), normalize_embeddings=True)

    # cosine_similarity returns shape (n_candidates, 1) here.
    cosines = cosine_similarity(candidate_vecs, jd_vec).flatten()

    results = [
        SimilarityResult(
            candidate_id=cid,
            score=round(max(0.0, float(c)) * 100.0, 2),
            raw_cosine=round(float(c), 6),
        )
        for cid, c in zip(ids, cosines)
    ]

    return sorted(results, key=lambda r: r.score, reverse=True)