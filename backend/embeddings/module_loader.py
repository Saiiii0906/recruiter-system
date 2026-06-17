from __future__ import annotations

import logging
import threading
from typing import Optional

from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)

_MODEL_NAME = "all-MiniLM-L6-v2"

_model: Optional[SentenceTransformer] = None
_lock = threading.Lock()


def get_model() -> SentenceTransformer:
    """Return the shared model instance, initializing it on first call."""
    global _model

    if _model is not None:
        return _model

    with _lock:
        # Double-checked locking: another thread may have initialized
        # while we were waiting on the lock.
        if _model is None:
            logger.info("Loading embedding model: %s", _MODEL_NAME)
            _model = SentenceTransformer(_MODEL_NAME)
            logger.info("Model loaded — embedding dim: %d", _model.get_sentence_embedding_dimension())

    return _model