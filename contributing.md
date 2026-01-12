# Contributing to Angel Design Tokens

Thank you for your interest in contributing to the Angel Design Token system! This guide explains how designers and developers can propose new tokens, make changes, and get them reviewed.

---

## Who Can Contribute?

| Role | Can Propose | Can Review | Can Merge |
|------|-------------|------------|-----------|
| Product Designer | New tokens, value changes | - | - |
| Design System Manager | All changes | All changes | Yes |
| Platform Engineer | Platform-specific needs | Platform outputs | - |
| Engineering Lead | - | Breaking changes | Yes |

---

## Types of Contributions

### 1. New Token Proposals

**When to propose a new token:**
- A design decision is being repeated across multiple components
- A value needs to be consistent across platforms
- An existing semantic meaning doesn't have a token

**NOT a good candidate for a token:**
- One-off values used in a single place
- Platform-specific hacks
- Implementation details (z-index, flex direction)

### 2. Token Value Changes

**When to change a value:**
- Brand update (e.g., new primary color)
- Accessibility improvement (e.g., better contrast)
- Bug fix (e.g., incorrect hex code)

### 3. Token Renames/Removals (Breaking Changes)

**Requires:**
- Discussion with platform leads
- Deprecation period
- Migration guide

---

## Contribution Process

### For Designers

#### Step 1: Update in Figma

1. Open the Angel Design System Figma file
2. Go to **Local Variables** panel
3. Add or modify the variable
4. Follow [naming conventions](./docs/token_structure_and_naming.md)

#### Step 2: Export Tokens

1. Run the "Tokens Studio" plugin (free)
2. Download the generated JSON file
3. Name it descriptively: `colors-update-brand-accent.json`

#### Step 3: Create Pull Request

**Option A: GitHub Web UI (Recommended for designers)**

1. Go to [angel-design-tokens repo](https://github.com/angel-studios/angel-design-tokens)
2. Navigate to `tokens/` folder
3. Click "Add file" → "Upload files"
4. Upload your JSON file (replaces existing if same name)
5. Click "Create pull request"
6. Fill in the PR template (see below)

**Option B: Git CLI**

```bash
# Clone repo (first time only)
git clone https://github.com/angel-studios/angel-design-tokens.git
cd angel-design-tokens

# Create branch
git checkout -b tokens/update-brand-colors

# Copy your exported JSON
cp ~/Downloads/color_base/tokens.json tokens/color_base/tokens.json

# Commit and push
git add tokens/
git commit -m "feat: update brand accent color to #16b087"
git push origin tokens/update-brand-colors

# Create PR via GitHub
```

#### Step 4: Fill PR Template

```markdown
## Summary
Brief description of changes

## Motivation
Why are these changes needed?

## Changes Made
- Changed `color.accent.600` from #129973 to #16b087
- Added `component.button.emphasis.brand.background_active` for pressed state

## Figma Link
[Link to Figma file/frame]

## Visual Preview
[Screenshots showing before/after if applicable]

## Breaking Changes
- [ ] This PR contains breaking changes

## Checklist
- [ ] Followed naming conventions
- [ ] Tested in Figma
- [ ] Updated documentation (if needed)
```

---

### For Developers

#### Proposing Platform-Specific Tokens

If your platform needs a token that doesn't exist:

1. Check if a similar semantic token exists
2. If not, open an issue first to discuss
3. Propose the token with clear justification

**Issue Template:**
```markdown
## Token Request

**Platform:** [e.g., Roku, Xbox]

**Proposed Token:**
- Name: `button.size.tv_xl.height`
- Value: `64`
- Type: `number`

**Justification:**
[Why this token is needed and can't use existing tokens]

**Usage Example:**
```brightscript
button.height = m.tokens.ButtonSizeTvXlHeight
```
```

#### Fixing Build Issues

If tokens are causing build failures:

1. Check [troubleshooting.md](./troubleshooting.md) first
2. If it's a token issue, create a PR with the fix
3. Reference the failing build in your PR

---

## PR Requirements

### All PRs Must

1. **Pass CI checks**
   - JSON format validation
   - Naming convention validation
   - No broken references

2. **Have a clear description**
   - What changed
   - Why it changed
   - Impact on platforms

3. **Include visual preview** (for visual changes)
   - Before/after screenshots
   - Or Figma frame link

### Breaking Change PRs Must Also

1. **Include migration guide**
2. **Have deprecation notices in place**
3. **Be approved by Design System Manager + Engineering Lead**
4. **Give 2-week notice before merge**

---

## Review Process

### Timeline

| PR Type | Target Review Time | Target Merge Time |
|---------|-------------------|-------------------|
| Bug fix | 1 day | 2 days |
| New token | 2-3 days | 1 week |
| Value change | 1-2 days | 3 days |
| Breaking change | 1 week | 2+ weeks |

### Reviewers

| Change Type | Required Reviewers |
|-------------|-------------------|
| Any token change | Design System Manager |
| Breaking change | + Engineering Lead |
| Platform-specific | + Platform Lead |

### Review Checklist

Reviewers will check:

- [ ] Follows naming conventions
- [ ] Token hierarchy is correct (primitive → semantic → component)
- [ ] No duplicate/similar tokens exist
- [ ] Value is correct format for type
- [ ] Documentation updated if needed
- [ ] Breaking changes properly deprecated

---

## Naming Convention Quick Reference

### Token Format (Tokens Studio)

```json
{
  "color": {
    "accent": {
      "600": {
        "value": "#16b087",
        "type": "color"
      }
    }
  }
}
```

**Key points:**
- Use `value` and `type` (NOT `$value` / `$type`)
- Use nested structure with dots: `color.accent.600`
- Use underscores for states: `background_hover`, `text_disabled`
- Color scale: 50-1000 (11 steps)

### Examples

| Token Path | Category | Description |
|------------|----------|-------------|
| `color.accent.600` | Base color | Teal brand action color |
| `color.guild.500` | Base color | Brand orange |
| `surface.default` | Semantic | Main background (themed) |
| `text.primary` | Semantic | Primary text color (themed) |
| `component.button.emphasis.primary.background` | Component | Button bg color |
| `component.button.emphasis.primary.background_hover` | Component | Button hover state |
| `button.size.md.height` | Component sizing | Button height (40) |
| `spacing.md` | Dimension | 10 |
| `spacing.4xl` | Dimension | 24 |
| `border_radius.rounded_lg` | Dimension | 12 |

### Rules

- **Use nested structure** for hierarchy (dots for nesting)
- **Use underscores** for states: `_hover`, `_pressed`, `_focused`, `_disabled`
- **Use underscores** for multi-word items: `border_radius`, `line_height`
- **Be descriptive** - semantic names for tokens developers use
- **Avoid abbreviations** except: xs, sm, md, lg, xl, 2xl, etc.

---

## Token Hierarchy

When adding tokens, place them in the correct tier:

```
TIER 1: Primitives (raw values, in color_base/)
└── color.accent.600: { "value": "#16b087", "type": "color" }

TIER 2: Semantic (intent-based, reference primitives, in color_theme/)
└── component.button.emphasis.primary.background: { "value": "{color.accent.600}", "type": "color" }

TIER 3: Component Sizing (in component/)
└── button.size.md.height: { "value": 40, "type": "number" }
```

**Developers should only use Tier 2 and Tier 3 tokens.**

---

## Common Mistakes to Avoid

### 1. Creating Duplicate Tokens

**Wrong:**
```json
{
  "button_background": { "value": "#16b087" },
  "cta_background": { "value": "#16b087" }
}
```

**Right:**
```json
{
  "component": {
    "button": {
      "emphasis": {
        "primary": {
          "background": { "value": "{color.accent.600}", "type": "color" }
        }
      }
    }
  }
}
```

### 2. Using Non-Semantic Names

**Wrong:**
```json
{
  "color": {
    "teal": { "value": "#16b087" }
  }
}
```

**Right:**
```json
{
  "color": {
    "accent": {
      "600": { "value": "#16b087", "type": "color" }
    }
  }
}
```

### 3. Skipping the Primitive Layer

**Wrong:**
```json
{
  "button_background": { "value": "#16b087" },
  "link_color": { "value": "#16b087" }
}
```

**Right:**
```json
{
  "color": {
    "accent": {
      "600": { "value": "#16b087", "type": "color" }
    }
  },
  "component": {
    "button": {
      "emphasis": {
        "primary": {
          "background": { "value": "{color.accent.600}", "type": "color" }
        }
      }
    }
  }
}
```

### 4. Using Wrong Format

**Wrong (W3C format):**
```json
{
  "color": {
    "$value": "#16b087",
    "$type": "color"
  }
}
```

**Right (Tokens Studio format):**
```json
{
  "color": {
    "value": "#16b087",
    "type": "color"
  }
}
```

---

## Getting Help

- **Questions about tokens**: #angel_design_system on Slack
- **Technical issues**: Create a GitHub issue
- **Process questions**: Ask Design System Manager

---

## Code of Conduct

- Be respectful in PR reviews
- Assume good intent
- Focus on the tokens, not the person
- Help others learn the system

Thank you for contributing to Angel Design Tokens!
