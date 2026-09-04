<!-- @import /home/lab/workspace/.claude/CLAUDE.md -->

# jupyterlab_galaxalabs_steel_light_theme Project Instructions

This file imports workspace-level configuration from `/home/lab/workspace/.claude/CLAUDE.md`.
All workspace rules apply. Project-specific rules below strengthen or extend them.

## Mandatory Bans (Reinforced)

- **No automatic git tags** - only create tags when user explicitly requests
- **No automatic version changes** - only modify version in package.json/pyproject.toml/etc. when user explicitly requests
- **No automatic publishing** - never run `make publish`, `npm publish`, `twine upload`, or similar without explicit user request
- **No manual package installs if Makefile exists** - use `make install` or equivalent Makefile targets, not direct `pip install`/`uv install`/`npm install`
- **No automatic git commits or pushes** - only when user explicitly requests

## Project Context

JupyterLab theme extension providing a light gray-blue color scheme in the Win95 light-gray convention, the light counterpart of the GalaxaLabs Steel Dark Theme. Current version 1.0.0.

- npm package: `galaxalabs_jupyterlab_steel_light_theme`
- PyPI package: `galaxalabs_jupyterlab_steel_light_theme`
- GitHub: `stellarshenson/jupyterlab_galaxalabs_steel_light_theme`
- Use `make publish` to build and publish to both registries
- Use `make install` for local development builds

## Required Workspace Skills

- `jupyterlab-extension` - build, CI/CD and jupyter-releaser workflows
- `playwright` - visual verification of CSS changes in a running JupyterLab

## Commit Message Format

- Use conventional commit format: `feat / fix / chore: <description>`
- Keep descriptions concise and descriptive
- Use lowercase for commit messages
- Do not include "Generated with Claude Code" or "Co-Authored-By: Claude" in commit messages

## Journal Rules (Project-Specific)

- **APPEND ONLY**: New journal entries MUST be appended at the end of the file, never inserted between existing entries
- The Stellars **journal plugin** is the canonical tool for this file: create via `/journal:create`, append via `/journal:update`, archive via `/journal:archive`
- Never edit `JOURNAL.md` directly

## Strengthened Rules

- CSS changes should be tested visually in JupyterLab before reporting complete
- Theme variables live in `style/variables.css` - scrollbar overrides in `style/scrollbars.css` - general overrides in `style/custom.css`
