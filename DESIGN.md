# Design Brief — YasinForge

**Direction**: Dark, immersive 3D agency showcase with molten fire accents and scroll-driven WebGL interactions.

**Tone**: Industrial futurism meets digital forge — bold, moody, with purposeful neon orange accents.

**Differentiation**: Real-time WebGL 3D objects transform based on scroll position, creating physics-driven momentum and depth.

## Color Palette

| Token      | OKLCH         | Role                                          |
|------------|---------------|-----------------------------------------------|
| background | 0.12 0 0      | Deep charcoal — immersive, near-black         |
| foreground | 0.95 0 0      | Near-white — high contrast, clear hierarchy   |
| primary    | 0.55 0.19 50  | Neon forge orange — molten fire, energy      |
| secondary  | 0.65 0.18 265 | Cyan digital highlight — technical contrast   |
| card       | 0.16 0 0      | Slightly elevated dark — surface separation   |
| accent     | 0.55 0.19 50  | Forge fire — interactive highlights, glow     |
| muted      | 0.22 0 0      | Muted dark — secondary surfaces, disabled     |
| border     | 0.25 0.08 50  | Subtle warm border — glow accents              |

## Typography

- **Display**: Space Grotesk — modern, geometric, tech-forward
- **Body**: DM Sans — clean, readable, contemporary
- **Scales**: Hero text-5xl, h2 text-3xl, label text-sm, body text-base

## Elevation & Depth

Layered approach: background (L 0.12) → cards (L 0.16) → elevated UI. Dark shadows (0 0 0 / 0.3), neon glow (0.55 0.19 50 / 0.5) for interactive states.

## Structural Zones

| Zone    | Background        | Border              | Notes                 |
|---------|-------------------|---------------------|-----------------------|
| Header  | card (L 0.16)     | subtle glow         | Sticky above hero     |
| Hero    | background (L 0.12) | —                 | Full-bleed WebGL      |
| Content | card (L 0.16)     | border-glow         | Alternating elevation |
| Footer  | background (L 0.12) | orange glow border | Dark text base        |

## Spacing

Section gaps: 16–20. Card spacing: 8. Internal: 4. Micro: 2–1. Industrial rhythm.

## Component Patterns

- **Buttons**: Neon orange bg, hover glow-neon shadow, active dims
- **Cards**: Rounded-lg, dark bg, border-glow, hover elevates
- **Badges**: Muted bg or reversed (neon bg, dark text)
- **Links**: Foreground text, neon underline on hover
- **Testimonial Cards**: Dark bg, orange stars, featured items show border-glow, glow-neon on hover
- **Blog Cards**: Dark bg, featured posts span 2x2 grid, cyan tags, orange/muted badges, image hover zoom
- **Post Badges**: Orange for Case Studies, muted for standalone Articles

## Motion

- **Entrance**: fade-in 0.6s ease-out, staggered children
- **Hover**: transition-glow 0.3s cubic-bezier
- **Decorative**: pulse-glow 2s infinite, float 3s ease-in-out
- **Scroll**: 3D objects rotate/translate based on scroll position

## Constraints

- CSS variables only, no raw hex or Tailwind defaults
- AA+ contrast (diff > 0.7)
- Glow sparingly on CTAs, hover, accents
- 3D canvas above text, clear visual separation
- Dark mode mandatory

## Signature Detail

Neon orange glowing borders on portfolio cards intensify on hover; real-time WebGL 3D transforms on scroll — industrial craft meets digital innovation.
