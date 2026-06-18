import json


def load_jd_json(
    file_path: str
):

    with open(
        file_path,
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)