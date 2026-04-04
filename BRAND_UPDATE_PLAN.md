# Revly Brand Update Plan

> Comprehensive plan for updating the Revly brand across marketing website and product.
> Based on Brand Book v1.0 (2026)

---

## Brand Identity Summary

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Hot magenta** (primary) | `#F0047F` | CTAs, logo mark, key UI elements, short headlines |
| Magenta dark | `#C0005F` | Hover/pressed states |
| Blush tint | `#FFE8F4` | Feature section backgrounds, callout cards, tag fills |
| Magenta background | `#FFF7FB` | Very light magenta backgrounds |
| **Golden yellow** (secondary) | `#F5C842` | Secondary buttons, milestone badges (use sparingly) |
| Yellow tint | `#FEF8DC` | Milestone cards, positive state backgrounds |
| **Near-black** | `#111111` | All body text and headlines (never use pure #000) |
| Mid gray | `#555555` | Body copy, descriptions |
| Soft gray | `#888888` | Muted text, captions, labels |
| Off-white | `#F7F7F5` | Page backgrounds, card surfaces, subtle section fills |
| Border | `#E4E4E0` | Borders, dividers |

### Color Usage Proportions
- ~50% Off-white / white (backgrounds)
- ~20% Near-black (text)
- ~20% Magenta (key elements)
- ~8% Blush tint (fills)
- ~2% Golden yellow (sparingly)

### Color Rules
1. **White is your best friend** -- Most of any layout should be white or off-white. Magenta earns power by contrast.
2. **One magenta element per section** -- Usually the primary CTA. Everything else neutral, tint, or near-black.
3. **Never use magenta as large-scale background** -- Full-bleed magenta only for cover pages, hero banners, or major campaign moments. Never for body content, pricing tables, etc.
4. **Use tints instead of full color** -- For feature cards, callout blocks, tag backgrounds, use blush tint (#FFE8F4). Reserve solid magenta for buttons, icons, and the logo mark.
5. **Let near-black do the heavy lifting** -- Most headlines in near-black, not magenta. Magenta headlines: 2-4 words max.

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Bricolage Grotesque | 800 | 48-64px |
| H1 | Bricolage Grotesque | 800 | 32px |
| H2 | Bricolage Grotesque | 700 | 22px |
| Body | DM Sans | 400 | 15px |
| Small/Caption | DM Sans | 300-400 | 13px |
| Label | DM Sans | 500 | 11px, uppercase, 0.1em tracking |

**Google Fonts import:**
```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap
```

**Magenta in headlines:** Short phrases only (2-4 words). Long magenta text loses legibility and cheapens the brand.

### Logo

The mark is three concentric circles -- a solid center surrounded by two progressively lighter rings. The wordmark is "revly" in Bricolage Grotesque 800, always lowercase, letter-spacing -0.4px.

**SVG Mark (on white/light backgrounds):**
```html
<svg width="30" height="30" viewBox="0 0 30 30">
  <circle cx="15" cy="15" r="14" fill="#F0047F" opacity="0.1"/>
  <circle cx="15" cy="15" r="9" fill="#F0047F" opacity="0.28"/>
  <circle cx="15" cy="15" r="4" fill="#F0047F"/>
</svg>
```

**SVG Mark (on dark backgrounds):**
```html
<svg width="30" height="30" viewBox="0 0 30 30">
  <circle cx="15" cy="15" r="14" fill="#F0047F" opacity="0.18"/>
  <circle cx="15" cy="15" r="9" fill="#F0047F" opacity="0.4"/>
  <circle cx="15" cy="15" r="4" fill="#F0047F"/>
</svg>
```

**Logo don'ts:**
- Never use greyscale
- Never stretch or distort
- Never place on busy gradients or photographic backgrounds
- Always maintain clear space equal to the height of the mark on all sides

### Buttons

| Style | Background | Text | Usage |
|-------|-----------|------|-------|
| Primary | `#F0047F` | White | Most important action per section. One per section max. |
| Secondary | `#F5C842` | `#5A3E00` | Second most important action. Max once per view. |
| Ghost | Transparent, `#F0047F` border | `#F0047F` | "Learn more", "View all" |
| Dark | `#111111` | White | "Schedule a demo" |
| Light | `#FFE8F4` | `#C0005F` | Supplementary actions |

Border radius: 8px (rounded-lg). Font: Bricolage Grotesque 700.

### Badges

| Style | Background | Text | Usage |
|-------|-----------|------|-------|
| Primary | `#F0047F` | White | One high-priority label per context |
| Light | `#FFE8F4` | `#C0005F` | Most tags and badges |
| Yellow | `#FEF8DC` | `#7a5c00` | Milestone/achievement badges |
| Dark | `#111111` | White | Platform/authority badges |
| Neutral | `#F7F7F5` + border | `#555555` | Generic tags |

### Feature Cards
- White background, `#E4E4E0` border, 12px border radius
- Labels: magenta colored text, uppercase, small
- Optional: left border accent in magenta (3px, with 0 12px 12px 0 border-radius)

---

## Voice & Tone

**Personality:** Warm, direct, specific. Like the smartest person in the room who doesn't need you to know it.

### Rules

1. **Be specific. Generalities don't convert.** Name real differentiators: sentiment screening, AI-drafted reviews, smart platform routing. Reach for specifics before vague claims.
2. **Name the problem before selling the solution.** Give prospects language for their problem, then offer Revly as the answer.
3. **Say it once. Say it clearly.** No qualifiers, no preamble, no sentences that repeat what the previous one said.
4. **Warm, not cheerful. Confident, not cold.** No exclamation marks as punctuation. No performed enthusiasm.
5. **One emoji maximum.** Used where it earns its place. Allowed: checkmark, lightbulb, lightning bolt (rarely). Never: rocket, fire, 100, or strings of multiple emojis. Never in headlines or product UI.

### Words to Avoid
`Powerful`, `Seamless`, `Streamline`, `Effortless`, `Unlock`, `Best-in-class`, `Empower`, `Leverage`, `Game-changer`, `Revolutionary`, `All-in-one`, `That's not X, that's Y`

### Examples

| Avoid | Use Instead |
|-------|-------------|
| "Unlock the full potential of your customer feedback." | "Happy customers get a review link. Unhappy ones get your inbox." |
| "Revly brings your entire review workflow into one place." | "You sent the review request. You just don't know if the customer was happy before you did." |
| "We're excited to offer a solution that can potentially help streamline your workflow." | "You could log into five platforms and hope nothing backfires. Or you could use Revly." |
| "We're SO excited to help you crush your review goals!" | "Getting this right used to take five logins and a lot of luck." |

---

## Website Implementation Plan

### Tailwind Config (replace on all pages)

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        magenta: { DEFAULT:'#F0047F', dark:'#C0005F', blush:'#FFE8F4', bg:'#FFF7FB' },
        gold: { DEFAULT:'#F5C842', tint:'#FEF8DC', dark:'#5A3E00' },
        dark: '#111111',
        'mid-gray': '#555555',
        'soft-gray': '#888888',
        'off-white': '#F7F7F5',
        border: '#E4E4E0',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"','system-ui','sans-serif'],
        sans: ['"DM Sans"','system-ui','sans-serif'],
      }
    }
  }
}
```

### CSS Styles (replace on all pages)

```css
html { scroll-behavior: smooth; }
.gradient-text {
  background: linear-gradient(135deg, #F0047F 0%, #C0005F 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-gradient {
  background: linear-gradient(180deg, #FFF7FB 0%, #FFE8F4 100%);
}
```

### Global Class Replacements

| Find | Replace |
|------|---------|
| `bg-primary-600` | `bg-magenta` |
| `hover:bg-primary-700` | `hover:bg-magenta-dark` |
| `bg-primary-100` | `bg-magenta-blush` |
| `bg-primary-50` | `bg-magenta-bg` |
| `text-primary-600` | `text-magenta` |
| `text-primary-200` | `text-magenta-blush` |
| `border-primary-600` | `border-magenta` |
| `text-slate-900` | `text-dark` |
| `text-slate-700` / `text-slate-600` | `text-mid-gray` |
| `text-slate-500` / `text-slate-400` | `text-soft-gray` |
| `bg-slate-50` / `bg-slate-100` | `bg-off-white` |
| `bg-slate-900` | `bg-dark` |
| `border-slate-200` | `border-border` |
| `border-slate-800` | `border-[#2a2a2a]` |
| Section badges (green/blue/purple) | `bg-magenta-blush text-magenta` |

### Navigation Logo (all pages)

```html
<a href="/" class="flex items-center gap-2">
  <svg width="30" height="30" viewBox="0 0 30 30">
    <circle cx="15" cy="15" r="14" fill="#F0047F" opacity="0.1"/>
    <circle cx="15" cy="15" r="9" fill="#F0047F" opacity="0.28"/>
    <circle cx="15" cy="15" r="4" fill="#F0047F"/>
  </svg>
  <span class="text-2xl font-display font-extrabold text-dark" style="letter-spacing:-0.4px">revly</span>
</a>
```

### Footer Logo (all pages, dark variant)

```html
<a href="/" class="flex items-center gap-2 mb-8">
  <svg width="30" height="30" viewBox="0 0 30 30">
    <circle cx="15" cy="15" r="14" fill="#F0047F" opacity="0.18"/>
    <circle cx="15" cy="15" r="9" fill="#F0047F" opacity="0.4"/>
    <circle cx="15" cy="15" r="4" fill="#F0047F"/>
  </svg>
  <span class="text-2xl font-display font-extrabold text-white" style="letter-spacing:-0.4px">revly</span>
</a>
```

### Headings
Add `font-display` class to all `<h1>`, `<h2>`, `<h3>`, `<h4>` elements.

### Page-Specific Copy Changes

| Page | Find | Replace |
|------|------|---------|
| index.html | "Monitor and respond, effortlessly." | "Monitor and respond with ease." (gradient-text on "Monitor and respond" only) |
| index.html | "Effortless for your team." | "Built for your team." |
| index.html | Stats bar `bg-primary-600` | `bg-dark` with `text-magenta` numbers |
| features.html | "Collect more reviews, effortlessly" | "Collect more reviews, automatically" |
| use-cases/ecommerce.html | "make it effortless" | "make it easy" |
| use-cases/agencies.html | "one powerful dashboard" | "one dashboard" |

### Files

All 9 pages need updating:
- `index.html`, `pricing.html`, `features.html`
- `privacy.html`, `terms.html`
- `use-cases/saas.html`, `use-cases/ecommerce.html`, `use-cases/agencies.html`, `use-cases/local-business.html`
