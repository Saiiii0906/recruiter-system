import pandas as pd
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATA_PATH = (PROJECT_ROOT/"data"/"raw"/"india_runs_data_and_ai_challenge"/ "sample_candidates.json")


def load_candidates():
    df = pd.read_json(DATA_PATH)

    print("=" * 80)
    print(DATA_PATH)
    print("=" * 80)

    print(df.iloc[30])

    return df
# import pandas as pd
# from pathlib import Path


# PROJECT_ROOT = Path(__file__).resolve().parents[2]

# DATA_PATH = (
#     PROJECT_ROOT
#     / "data"
#     / "raw"
#     / "india_runs_data_and_ai_challenge"
#     / "sample_candidates.json"
# )


# def load_candidates():

#     print("\nLOADING FILE:")
#     print(DATA_PATH)

#     df = pd.read_json(DATA_PATH)

#     print("TOTAL ROWS:", len(df))

#     print(
#         "LAST 10 IDS:",
#         sorted(
#             df["candidate_id"].astype(str).tolist()
#         )[-10:]
#     )

#     return df