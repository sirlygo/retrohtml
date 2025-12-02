# Repository Instructions for Dev Team and Bug Testers

Welcome to the RetroBat Anywhere project. These guidelines apply to everyone working in this repository, including the full development team and QA/bug testers.

## Scope
- This file applies to all files in this repository unless a more specific `AGENTS.md` is added in a subdirectory.

## Development Guidelines
- Favor readability: clear naming, concise comments that explain *why* rather than *what*.
- Keep HTML/CSS/JS self-contained and avoid introducing build steps unless necessary.
- Do not wrap imports in `try/catch` blocks.
- When updating UI text, keep the friendly, encouraging tone used elsewhere in the app.
- Add inline documentation for any new localStorage keys or query parameters.

## Testing and QA
- Prefer lightweight, fast checks (linting, formatting, or simple browser tests) over heavy toolchains.
- When reproducing or verifying bugs, record exact steps and browser/environment details inside commit messages or PR notes.
- If a test must be skipped, explain why in the related notes.

## PR and Commit Expectations
- Use descriptive commit messages that summarize the change.
- Keep diffs focused; separate unrelated fixes into different commits when possible.
- Update the PR body with a brief summary and any testing performed.

## File Organization
- Place shared assets in `assets/`; avoid creating parallel directories unless required.
- For documentation updates, prefer `README.md` for user-facing guidance and add new markdown files only when scope is narrow and well-defined.
