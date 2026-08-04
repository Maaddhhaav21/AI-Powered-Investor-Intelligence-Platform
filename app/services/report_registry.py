from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from uuid import uuid4

from app.core.config import REPORT_DIR


class ReportRegistry:

    def __init__(self):

        self.registry = REPORT_DIR / "reports.json"

        if not self.registry.exists():

            self.registry.write_text(
                "[]",
                encoding="utf-8",
            )

    def _load(self):

        return json.loads(
            self.registry.read_text(
                encoding="utf-8"
            )
        )

    def _save(
        self,
        data,
    ):

        self.registry.write_text(
            json.dumps(
                data,
                indent=4,
            ),
            encoding="utf-8",
        )

    def add(
        self,
        filename: str,
        metadata: dict,
    ):

        reports = self._load()

        report = {

            "id": str(uuid4()),

            "companyName":
                metadata.get(
                    "company_name",
                    Path(filename).stem,
                ),

            "ticker":
                metadata.get(
                    "ticker",
                    "",
                ),

            "fileName": filename,

            "fileSizeBytes":
                Path(
                    metadata["pdf_path"]
                ).stat().st_size
                if metadata.get("pdf_path")
                else 0,

            "fiscalYear":
                str(
                    metadata.get(
                        "year",
                        "",
                    )
                ),

            "uploadedAt":
                datetime.now().isoformat(),

            "status": "ready",

            "pageCount":
                metadata.get(
                    "page_count",
                    0,
                ),
        }

        reports.append(report)

        self._save(reports)

        return report

    def list(self):

        return self._load()