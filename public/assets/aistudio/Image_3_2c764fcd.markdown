---
name: Warm Sanctuary
colors:
  surface: '#f2fcf6'
  surface-dim: '#d2dcd7'
  surface-bright: '#f2fcf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf6f1'
  surface-container: '#e6f0eb'
  surface-container-high: '#e0eae5'
  surface-container-highest: '#dbe5e0'
  on-surface: '#141d1a'
  on-surface-variant: '#404944'
  inverse-surface: '#29322f'
  inverse-on-surface: '#e9f3ee'
  outline: '#707973'
  outline-variant: '#bfc9c2'
  surface-tint: '#2a6952'
  primary: '#004732'
  on-primary: '#ffffff'
  primary-container: '#1e5f48'
  on-primary-container: '#96d7b9'
  inverse-primary: '#94d4b7'
  secondary: '#a13e28'
  on-secondary: '#ffffff'
  secondary-container: '#fd8367'
  on-secondary-container: '#721c09'
  tertiary: '#613000'
  on-tertiary: '#ffffff'
  tertiary-container: '#824508'
  on-tertiary-container: '#ffbb88'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#aff0d2'
  primary-fixed-dim: '#94d4b7'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#09513b'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a3'
  on-secondary-fixed: '#3d0600'
  on-secondary-fixed-variant: '#822714'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#ffb780'
  on-tertiary-fixed: '#2f1400'
  on-tertiary-fixed-variant: '#6f3800'
  background: '#f2fcf6'
  on-background: '#141d1a'
  surface-variant: '#dbe5e0'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system establishes an empathetic, responsive, and organized platform built for stray animal rescue, foster workflows, and adoption networks. The interface balances high-urgency crisis management (SOS alerts, critical medical reports) with warm, optimistic discovery surfaces (pet profiles, success stories, community updates).

### Brand Personality & Tone
- **Compassionate & Reassuring:** Interfaces rely on calm, natural tones and welcoming typography to mitigate stress for distressed rescuers and potential adopters.
- **Action-Oriented & Dependable:** High-stakes reporting flows minimize visual noise and maximize clarity, ensuring fast-path rescues with low cognitive load.
- **Warm & Organic:** Soft geometry, gentle tonal transitions, and tactile card layouts remove the clinical coldness often found in municipal reporting tools.

### Design Movement & Aesthetic Direction
The style merges **Modern Organic Minimalism** with **Tactile Softness**:
- Generous, rounded surfaces (up to full pills) that communicate safety and approachability.
- Natural, cream-tinted canvases paired with deep botanical greens and vibrant terracotta callouts.
- Card-based modular feeds with layered elevations that prioritize high-speed scanning on handheld viewports.

## Colors

The palette grounds the interface in nature and well-being through balanced botanical tones, supported by urgent terracotta accents and creamy foundation neutrals.

### Color Roles & Distribution
- **Primary (`#1E5F48`):** Deep Forest Green serves as the anchor tone for primary actions, navigation active states, verified tags, and core branding. It projects life, care, and stability.
- **Secondary (`#E06D53`):** Terracotta / Amber Coral represents urgent states, SOS distress triggers, critical medical indicators, and high-priority action alerts without evoking harsh bureaucratic hostility.
- **Tertiary (`#F4A261`):** Warm Sand Gold acts as a secondary warm state for pending inquiries, temporary holds, or mid-level care alerts.
- **Neutral Core (`#1B2421`):** Deep Forest Charcoal replaces pure black for body and display text, eliminating harsh digital contrast while retaining exceptional legibility.

### Surface and Semantic Specifications
- **Canvas Base:** Soft warm cream (`#FBF9F5`) provides a soothing background tone that softens contrast against device displays.
- **Surface Elevation:** Pure clean white (`#FFFFFF`) is reserved strictly for interactive cards, sheets, and elevated overlays to create clean visual layers.
- **Muted Surfaces:** Warm neutral tint (`#F4EFEB`) serves as neutral backdrops for badge containers, inactive inputs, and secondary button fills.
- **Status Surfaces & Badges:**
  - *Emergency / SOS:* Background `#FDE8E4`, Text `#B83E24`, Border `#F8B6A8`.
  - *Safe / Adopted:* Background `#E8F5E9`, Text `#1B5E20`, Border `#A5D6A7`.
  - *Medical Care Needed:* Background `#FFF4E5`, Text `#B25E00`, Border `#FFCC80`.
  - *In Foster:* Background `#E0F2F1`, Text `#00695C`, Border `#80CBC4`.

## Typography

This design system uses **Plus Jakarta Sans** across all roles to ensure geometric warmth, modern clarity, and optimal rendering on mobile screens.

### Hierarchy & Legibility Directives
- **Friendly Display Headers:** Headlines utilize bold and extrabold weights with negative letter tracking, creating compact, confident titles that pair cleanly with large pet portrait photography.
- **Mobile Readability:** Mobile headline tokens downscale proportionally to prevent awkward three-line wraps in tight portrait layouts.
- **Generous Body Metrics:** Body text weights sit at 400 with a relaxed line height ratio (1.45–1.55x) to ensure smooth scanning during anxious moments, such as triage steps or reporting forms.
- **Labels & Micro-copy:** Status tags, distance counters, and floating pill chips rely on `label-sm` and `label-md` with slight letter tracking expansion to maintain clarity against tinted badge backgrounds.

## Layout & Spacing

The layout is built for fluid mobile-first presentation, utilizing consistent padding scales that honor device safe areas and provide thumb-accessible controls.

### Mobile Grid & Spatial Architecture
- **Canvas Margins:** Fixed `1rem` (16px) margin on narrow mobile devices expands to `1.25rem` (20px) on standard tablets, preserving edge buffer space.
- **Component Layout:** Feed layouts use a 4-column fluid mobile grid collapsing to 1- or 2-column card arrays depending on viewport width.
- **Safe Zones:** Sticky bottom navigation bars and floating SOS elements maintain a persistent 24px clearance above the system navigation bar or gesture home indicator.
- **Vertical Rhythm:**
  - Grouped internal card elements: `space-xs` (4px) to `space-sm` (8px).
  - Inter-component card spacing: `space-md` (16px).
  - Distinct content sections (e.g., medical history vs. temperament): `space-lg` (24px) to `space-xl` (36px).

## Elevation & Depth

This system avoids aggressive skeuomorphic drops and harsh drop shadows. Instead, it relies on warm, tinted ambient illumination and subtle low-contrast borders that mimic sunlight on natural paper.

### Depth Hierarchy
1. **Level 0 (Base Canvas):** `#FBF9F5` flat surface. No elevation.
2. **Level 1 (Card & Content Blocks):** `#FFFFFF` surface accompanied by a subtle warm-tinted shadow: `0px 2px 8px -1px rgba(27, 36, 33, 0.05), 0px 1px 3px 0px rgba(27, 36, 33, 0.03)`. Encased with a hairline boundary: `1px solid rgba(27, 36, 33, 0.06)`.
3. **Level 2 (Interactive Floating Elements & Top Sheets):** Modals, sticky action bars, and bottom sheets use a raised diffuse shadow: `0px 8px 24px -4px rgba(27, 36, 33, 0.08), 0px 4px 8px -2px rgba(27, 36, 33, 0.04)`.
4. **Level 3 (Urgent / SOS Floating Triggers):** SOS floating action buttons project an amber-tinted shadow: `0px 12px 28px -4px rgba(224, 109, 83, 0.35)`.

## Shapes

The interface embraces organic curvature. Rounded shapes convey kindness and vulnerability, reinforcing a compassionate environment for animal welfare.

### Shape Hierarchy
- **Pills (Full Radius / `9999px`):** Used universally for status badges, tag filters, category pills, primary action buttons, and rescue urgency markers.
- **Large Components (`rounded-xl` / 24px):** Feed cards, rescue case details, photo carousels, and modal dialog sheets.
- **Standard Controls (`rounded-lg` / 16px):** Form input fields, segmented tabs, and secondary interactive touchpoints.
- **Small Controls (`rounded-md` / 8px):** Stepper indicators, thumbnail wrappers, and nested attribute tags.

## Components

### Buttons
- **Primary Action (Rescue / Adopt):** Full-pill shape, `#1E5F48` background, `#FFFFFF` typography (`label-lg`), minimum touch target of 48px height. On pressed state: scale down to 0.98 with `#174837`.
- **Urgent Action (SOS / Emergency Report):** Full-pill shape, `#E06D53` background with white text, paired with Level 3 warm glow. Features prominent rescue icon prefix.
- **Secondary / Ghost:** Full-pill shape, `#F4EFEB` background, `#1B2421` label with zero outer shadow.

### Status Chips & Urgency Badges
- **Urgent / Medical Need:** Full pill, 6px vertical by 12px horizontal padding, with a 6px status dot indicator on the left. Uses the semantic warm alert pairing (e.g., `#FDE8E4` fill, `#B83E24` text).
- **Distance / Location Tag:** Semi-translucent neutral pill (`rgba(27, 36, 33, 0.06)` or white blur over photo), paired with location icon and distance counter (e.g., "1.2 km away").

### Cards
- **Pet Profile Card:** Elevated Level 1 white card, `24px` corner radius, with a 4:3 or 1:1 image container at the top. Top badges float over the image with an ambient blur backdrop. Content compartment includes animal name, breed, distance tag, and urgency level.
- **SOS Alert Card:** Bordered in `#E06D53` (1.5px stroke), featuring high-contrast urgent badge, location timestamp, and a prominent "Respond" action.

### Form Inputs
- **Text & Location Fields:** Height 52px, `16px` border radius, `#FFFFFF` surface fill, bordered with `1px solid rgba(27, 36, 33, 0.12)`. Active state transitions to `#1E5F48` with a 2px stroke.
- **Image Uploader (Rescue Evidence):** Dashed border (`2px dashed rgba(30, 95, 72, 0.3)`), `#F4EFEB` fill, rounded `20px`, accompanied by friendly paw/camera iconography.

### Selection Controls (Checkboxes & Radios)
- **Checkboxes:** 22px square with `6px` radius. Checked state fills with `#1E5F48` displaying a white checkmark.
- **Radio Buttons:** Circular indicator, `#1E5F48` fill with internal white bullseye when selected.

### Navigation & Floating Action Bars
- **Bottom Navigation Bar:** Floating dock style elevated 16px above the display bottom edge, white container with `32px` corner radius, Level 2 ambient shadow. Icons use `#1B2421` (60% opacity inactive, 100% Forest Green active).
- **Floating SOS Trigger:** Circular 56px FAB in the lower-right quadrant, `#E06D53` fill, emergency bell or beacon glyph, Level 3 amber shadow.