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

1. Run the "Design Tokens (W3C) Export" plugin
2. Download the generated JSON file
3. Name it descriptively: `colors-update-brand-blue.json`

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
cp ~/Downloads/colors.json tokens/colors.json

# Commit and push
git add tokens/colors.json
git commit -m "feat: update brand primary color to #2563EB"
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
- Changed `color-action-primary-background` from #3B82F6 to #2563EB
- Added `color-action-primary-background-active` for pressed state

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
- Name: `tv-button-focus-glow-spread`
- Value: `20`
- Type: `number`

**Justification:**
[Why this token is needed and can't use existing tokens]

**Usage Example:**
```brightscript
button.focusGlowSpread = m.tokens.tvButtonFocusGlowSpread
```
```

#### Fixing Build Issues

If tokens are causing build failures:

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) first
2. If it's a token issue, create a PR with the fix
3. Reference the failing build in your PR

---

## PR Requirements

### All PRs Must

1. **Pass CI checks**
   - JSON schema validation
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

### Format
```
[category]-[type]-[item]-[subitem]-[state]
```

### Examples

| Token | Category | Type | Item | Subitem | State |
|-------|----------|------|------|---------|-------|
| `color-blue-500` | color | blue | 500 | - | - |
| `color-action-primary-background` | color | action | primary | background | - |
| `color-action-primary-background-hover` | color | action | primary | background | hover |
| `spacing-padding-md` | spacing | padding | md | - | - |
| `tv-layout-row-height-lg` | tv | layout | row-height | lg | - |

### Rules

- ✅ Use lowercase
- ✅ Use hyphens between words
- ✅ Be descriptive
- ✅ Use semantic names for tokens developers use
- ❌ Don't use abbreviations (except: sm, md, lg, xl)
- ❌ Don't use platform-specific names
- ❌ Don't use magic numbers

---

## Token Hierarchy

When adding tokens, place them in the correct tier:

```
TIER 1: Primitives (raw values)
└── color-blue-500: #3B82F6

TIER 2: Semantic (intent-based, reference primitives)
└── color-action-primary-background: {color-blue-500}

TIER 3: Component (specific to components, reference semantic)
└── component-button-primary-background: {color-action-primary-background}
```

**Developers should only use Tier 2 and Tier 3 tokens.**

---

## Common Mistakes to Avoid

### 1. Creating Duplicate Tokens

❌ **Wrong:**
```json
{
  "button-background": { "$value": "#3B82F6" },
  "cta-background": { "$value": "#3B82F6" }
}
```

✅ **Right:**
```json
{
  "color-action-primary-background": { "$value": "#3B82F6" }
}
```

### 2. Using Non-Semantic Names

❌ **Wrong:**
```json
{
  "color-dark-blue": { "$value": "#1E40AF" }
}
```

✅ **Right:**
```json
{
  "color-action-primary-background-active": { "$value": "#1E40AF" }
}
```

### 3. Skipping the Primitive Layer

❌ **Wrong:**
```json
{
  "button-background": { "$value": "#3B82F6" },
  "link-color": { "$value": "#3B82F6" }
}
```

✅ **Right:**
```json
{
  "color": {
    "blue": {
      "500": { "$value": "#3B82F6" }
    },
    "action": {
      "primary": {
        "background": { "$value": "{color.blue.500}" }
      }
    },
    "text": {
      "link": { "$value": "{color.blue.500}" }
    }
  }
}
```

---

## Getting Help

- **Questions about tokens**: #design-system on Slack
- **Technical issues**: Create a GitHub issue
- **Process questions**: Ask Design System Manager

---

## Code of Conduct

- Be respectful in PR reviews
- Assume good intent
- Focus on the tokens, not the person
- Help others learn the system

Thank you for contributing to Angel Design Tokens!
