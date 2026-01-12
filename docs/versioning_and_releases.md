# Versioning and Releases

## Overview

This document explains how the design token system handles versioning, breaking changes, deprecation, and releases. Proper versioning ensures consuming applications don't break when tokens are updated.

---

## Semantic Versioning

We follow [Semantic Versioning 2.0.0](https://semver.org/):

```
MAJOR.MINOR.PATCH

Examples:
1.0.0 → 1.0.1 (Patch: bug fix, no breaking changes)
1.0.0 → 1.1.0 (Minor: new tokens added, backwards compatible)
1.0.0 → 2.0.0 (Major: breaking changes)
```

### Version Bump Rules

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| **Bug fix** (value correction) | PATCH | `1.0.0 → 1.0.1` |
| **New token added** | MINOR | `1.0.0 → 1.1.0` |
| **New token category** | MINOR | `1.0.0 → 1.1.0` |
| **Token value changed** | PATCH or MINOR* | `1.0.0 → 1.0.1` |
| **Token renamed** | MAJOR | `1.0.0 → 2.0.0` |
| **Token removed** | MAJOR | `1.0.0 → 2.0.0` |
| **Token type changed** | MAJOR | `1.0.0 → 2.0.0` |

*Value changes are PATCH if they're corrections, MINOR if they're intentional design updates.

---

## Breaking Changes

### What Constitutes a Breaking Change

| Change | Breaking? | Why |
|--------|-----------|-----|
| Remove a token | **YES** | Apps referencing it will fail |
| Rename a token | **YES** | Apps referencing old name will fail |
| Change token type | **YES** | Type mismatch errors |
| Change value format | **YES** | Parsing errors |
| Add new token | No | Backwards compatible |
| Change token value | No* | Apps still work, just look different |

*Value changes can cause visual regressions but don't break builds.

### Breaking Change Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      BREAKING CHANGE WORKFLOW                                │
└─────────────────────────────────────────────────────────────────────────────┘

     1. DEPRECATE        2. COMMUNICATE        3. MIGRATE        4. REMOVE
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│                 │  │                 │  │                 │  │                 │
│  Add deprecated │  │  Announce in    │  │  Update all     │  │  Remove in      │
│  flag + alias   │  │  Slack + docs   │  │  consuming      │  │  next MAJOR     │
│                 │  │                 │  │  apps           │  │  version        │
│                 │  │                 │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
       v1.x                v1.x               v1.x                  v2.0
```

### Deprecation Example

When renaming `button_bg` to `component.button.emphasis.primary.background`:

**Step 1: Add deprecation (v1.5.0)**
```json
{
  "component": {
    "button": {
      "emphasis": {
        "primary": {
          "background": {
            "value": "{color.accent.600}",
            "type": "color"
          }
        }
      }
    }
  },
  "button_bg": {
    "value": "{color.accent.600}",
    "type": "color",
    "$deprecated": true,
    "$deprecatedMessage": "Use 'component.button.emphasis.primary.background' instead. Will be removed in v2.0.0"
  }
}
```

**Step 2: Build outputs both tokens**
```css
/* Generated CSS */
--button-bg: #16b087; /* DEPRECATED: Use --component-button-emphasis-primary-background */
--component-button-emphasis-primary-background: #16b087;
```

**Step 3: Communicate**
```markdown
## Deprecation Notice (v1.5.0)

The following tokens are deprecated and will be removed in v2.0.0:

| Old Token | New Token | Removal Date |
|-----------|-----------|--------------|
| `button_bg` | `component.button.emphasis.primary.background` | Q2 2024 |

Please update your code to use the new tokens.
```

**Step 4: Remove (v2.0.0)**
```json
{
  "component": {
    "button": {
      "emphasis": {
        "primary": {
          "background": {
            "value": "{color.accent.600}",
            "type": "color"
          }
        }
      }
    }
  }
}
```

---

## Release Process

### Automated Releases

Releases are automated via GitHub Actions when changes are merged to `main`:

```yaml
# Automatic version determination based on commit messages
- "BREAKING:" or "BREAKING CHANGE:" → MAJOR bump
- "feat:" → MINOR bump
- "fix:", "docs:", "style:", "refactor:" → PATCH bump
```

### Manual Releases

For explicit version control:

```bash
# Create release branch
git checkout -b release/v2.0.0

# Update version in package.json files
npm version major --workspaces

# Create PR to main
gh pr create --title "Release v2.0.0" --body "Major release with breaking changes"
```

---

## Release Checklist

### Before Release

- [ ] All CI checks passing
- [ ] Breaking changes documented in CHANGELOG
- [ ] Deprecation warnings added for removed tokens
- [ ] Migration guide written (for major releases)
- [ ] All consuming apps notified (for major releases)

### Release Steps

1. **Merge to main** - Triggers build workflow
2. **Verify build** - Check GitHub Actions completed
3. **Verify npm publish** - Check packages on npmjs.com
4. **Verify Git tag** - Check releases on GitHub
5. **Monitor deployments** - Watch platform CI/CD pipelines

### After Release

- [ ] Slack announcement sent
- [ ] Release notes published
- [ ] Documentation updated
- [ ] Platform teams notified

---

## Changelog

We maintain a CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/):

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2024-03-15

### BREAKING CHANGES
- Removed deprecated `button_bg` token (use `component.button.emphasis.primary.background`)
- Renamed `color.grey.*` to `color.neutral.*`

### Added
- New `button.size.tv_xl` tokens for large TV buttons

### Changed
- Updated `color.accent.600` from #129973 to #16b087

### Deprecated
- `spacing_base` (use `spacing.md`)

## [1.5.0] - 2024-02-01

### Added
- Full button component token structure with 5 sizes (xs-xl)
- Component button color variants (primary, brand, secondary, transparent, ghost)
- TV typography tokens (~1.25x larger)

### Deprecated
- `button_bg` (use `component.button.emphasis.primary.background`, removal in v2.0.0)

## [1.4.0] - 2024-01-15

### Added
- Spacing scale from 4xs to 27xl
- Border radius tokens (rounded_none to rounded_full)

### Fixed
- Corrected `color.neutral.500` value
```

---

## Migration Guides

For major version bumps, we provide migration guides:

### Example: v1.x to v2.0 Migration Guide

```markdown
# Migration Guide: v1.x → v2.0

## Overview

v2.0 includes breaking changes. This guide helps you migrate.

## Breaking Changes

### 1. Token Renames

| Old Token (v1.x) | New Token (v2.0) |
|------------------|------------------|
| `button_bg` | `component.button.emphasis.primary.background` |
| `button_text` | `component.button.emphasis.primary.text` |
| `color.grey.*` | `color.neutral.*` |

**Migration Script (CSS):**
```bash
find . -name "*.css" -exec sed -i '' 's/--button-bg/--component-button-emphasis-primary-background/g' {} \;
find . -name "*.css" -exec sed -i '' 's/--color-grey/--color-neutral/g' {} \;
```

**Migration Script (React Native):**
```bash
find . -name "*.ts" -name "*.tsx" -exec sed -i '' 's/tokens\.buttonBg/tokens.component.button.emphasis.primary.background/g' {} \;
```

### 2. Removed Tokens

The following tokens were deprecated in v1.5 and removed in v2.0:

| Removed Token | Replacement |
|---------------|-------------|
| `spacing_base` | `spacing.md` |
| `font_primary` | `font.family.body` |

### 3. Structure Changes

| v1.x Path | v2.0 Path |
|-----------|-----------|
| `tokens.colors.accent600` | `tokens.color.accent[600]` |
| `tokens.spacing.md` | `tokens.spacing.md` (unchanged) |
| `tokens.button.height.md` | `tokens.button.size.md.height` |

## Step-by-Step Migration

1. **Update package**
   ```bash
   npm install @angel/tokens-<platform>@2.0.0
   ```

2. **Run migration script**
   ```bash
   npx @angel/tokens-migration-v2
   ```

3. **Fix TypeScript errors**
   - Run `tsc --noEmit` and fix type errors

4. **Visual QA**
   - Check all screens for visual regressions

5. **Run tests**
   - Ensure all tests pass
```

---

## Rollback Procedure

If a release causes issues:

### Immediate Rollback (npm)

```bash
# Revert to previous version
npm install @angel/tokens-<platform>@1.4.0

# Or use package.json pinning
"@angel/tokens-web": "1.4.0"  # Exact version, not ^1.4.0
```

### Git Rollback

```bash
# Revert the release commit
git revert <release-commit-sha>
git push origin main

# This triggers a new release with previous tokens
```

### Emergency Hotfix

```bash
# Create hotfix branch from last good tag
git checkout -b hotfix/fix-critical-bug v1.4.0

# Make fix
git commit -m "fix: critical color value"

# Merge to main
git checkout main
git merge hotfix/fix-critical-bug
git push origin main
```

---

## Version Pinning Recommendations

### For Production Apps

```json
{
  "dependencies": {
    "@angel/tokens-web": "~1.4.0"
  }
}
```
- `~1.4.0` allows PATCH updates (1.4.1, 1.4.2)
- Prevents unexpected MINOR/MAJOR updates

### For Development/Testing

```json
{
  "dependencies": {
    "@angel/tokens-web": "^1.4.0"
  }
}
```
- `^1.4.0` allows MINOR updates (1.5.0, 1.6.0)
- Gets new tokens automatically

### For Maximum Stability

```json
{
  "dependencies": {
    "@angel/tokens-web": "1.4.0"
  }
}
```
- Exact version, no automatic updates
- Must manually update

---

## Notification Channels

| Event | Channel | Audience |
|-------|---------|----------|
| New release | #angel_design_system (Slack) | All developers |
| Breaking change planned | Email + Slack | Platform leads |
| Deprecation notice | Slack + PR comment | Affected teams |
| Emergency rollback | #engineering (Slack) | All developers |

---

## Related Documents

- [CI/CD Workflow](./ci_cd_workflow.md)
- [Token Structure and Naming](./token_structure_and_naming.md)
- [Contributing](../contributing.md)
