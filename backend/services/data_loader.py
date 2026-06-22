import pandas as pd
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATA_PATH = (PROJECT_ROOT/"data"/"raw"/"india_runs_data_and_ai_challenge"/ "sample_candidates.json")


def load_candidates():
    return pd.read_json(DATA_PATH)