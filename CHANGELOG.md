# Changelog

<!-- <START NEW CHANGELOG ENTRY> -->

<!-- <END NEW CHANGELOG ENTRY> -->

## [1.0.9] - 2026-09-05

### Added

- First release to npm and PyPI. Light gray-blue theme in the Win95 light-gray convention, the light counterpart of the Steel dark theme, built to reduce eye strain
- Galata UI tests covering the launcher and a notebook rendering

### Changed

- Theme menu entry is `Steel Light Theme`; the vendor prefix was dropped from the display name, the package description and the palette comments

### Fixed

- ANSI traceback output is legible on a light canvas. Class-based foregrounds are redrawn from the theme palette, and 256-colour and 24-bit spans, which core emits as inline styles reachable by no colour class, are repainted through an attribute selector scoped to stderr
- Alert panels are separable without colour discrimination. Panels and borders are spread by lightness rather than hue, verified against a deuteranopia simulation
- Markdown links inside alert panels reach at least 4.85:1; core does not repaint them, so the contrast is set at the token
- Destructive buttons draw from the muted error scale, and Settings, Restore to Defaults no longer renders at 1.37:1
