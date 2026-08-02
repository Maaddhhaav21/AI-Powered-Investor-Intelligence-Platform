from pathlib import Path

import json

from pathlib import Path

def save_json(

    data,

    output_path: Path,

):

    output_path.write_text(

        json.dumps(

            data,

            indent=4,

        ),

        encoding="utf-8",

    )
def ensure_directory(directory: Path) -> None:
    directory.mkdir(parents=True, exist_ok=True)


def get_file_stem(file_path: Path) -> str:
    return file_path.stem