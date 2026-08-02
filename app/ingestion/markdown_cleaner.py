import re


class MarkdownCleaner:
    """
    Cleans markdown generated from PDF
    before chunking.
    """

    def clean(self, markdown: str) -> str:

        markdown = self._normalize_line_endings(markdown)

        markdown = self._remove_trailing_spaces(markdown)

        markdown = self._remove_page_numbers(markdown)

        markdown = self._remove_horizontal_rules(markdown)

        markdown = self._remove_extra_blank_lines(markdown)

        return markdown.strip()

    def _normalize_line_endings(self, text: str) -> str:
        return text.replace("\r\n", "\n").replace("\r", "\n")

    def _remove_trailing_spaces(self, text: str) -> str:
        return "\n".join(line.rstrip() for line in text.splitlines())

    def _remove_page_numbers(self, text: str) -> str:
        return re.sub(
            r"(?im)^page\s+\d+\s*$",
            "",
            text,
        )

    def _remove_horizontal_rules(self, text: str) -> str:
        return re.sub(
            r"\n-{5,}\n",
            "\n",
            text,
        )

    def _remove_extra_blank_lines(self, text: str) -> str:
        return re.sub(
            r"\n{3,}",
            "\n\n",
            text,
        )