# Changelog

<!-- <START NEW CHANGELOG ENTRY> -->

<!-- <END NEW CHANGELOG ENTRY> -->

## [1.0.13] - 2026-09-07

### Changed

- Removed the theme's own `--jp-colourful-tab-*` override block. `jupyterlab_colourful_tab_extension` 1.1.21 ships one muted light palette that reads as soft tints on this theme's grey tab bar as well as on stock JupyterLab Light, so the theme no longer needs to repaint it. The override had also outranked the extension's `:root` block, which is where a user's own settings palette is written, so palette edits in the Settings Editor now apply on this theme

## [1.0.12] - 2026-09-07

### Changed

- Colourful-tab accents retuned from 70 to 85 percent of the tab extension's stock chroma. The previous cap sat too far below the palette that extension draws for a white canvas, and against this theme's tab bar at CIELAB L\* 73 - 21 points lower - the hue stopped reading and the tabs rendered as pale grey patches. Hue angle and lightness are unchanged; only chroma moves
- Alpha was evaluated as an alternative and rejected: the dock tab bar computes to `rgba(0, 0, 0, 0)`, so a translucent tab composites over whatever sits behind it rather than over a fixed surface

## [1.0.11] - 2026-09-06

### Changed

- Colourful-tab accents no longer inherit the tab extension's pastels, which were drawn for a white canvas. The six hues are kept and the chroma capped at CIELAB C\* 15, the ceiling this theme already uses for a large tinted surface, leaving the six separable at a minimum pairwise dE76 of 10.9 and every tab label above 6.2:1
- README now names the renamed Titanium sibling instead of Concrete

## [1.0.10] - 2026-09-05

### Changed

- Theme menu entry renamed to `Galaxa Light Theme - Steel`, which groups the four sibling themes into one contiguous block in the theme picker. Only the display name registered with `IThemeManager` changes - the repository, the npm package and the PyPI distribution keep their identifiers
- Package and plugin descriptions now name the dark sibling by its new menu entry, `Galaxa Dark Theme - Steel`

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
