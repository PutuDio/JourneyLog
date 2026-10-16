---
version: alpha
name: Journey.Cloud
description: >-
  Journey is a free online journal and diary app that transforms personal memories into a beautifully organized,
  emotionally resonant digital space. The design system emphasizes warmth, accessibility, and the celebration of life's
  moments through a soft, approachable aesthetic.
logo:
  src: https://journey.cloud/_nuxt/icons/512x512.maskable.ba505b01.png
colors:
  surface: '#f5f7f8'
  surface-dim: '#e8ecef'
  surface-bright: '#ffffff'
  surface-container-lowest: '#f0f3f5'
  surface-container-low: '#eaeef2'
  surface-container: '#e5eaef'
  surface-container-high: '#dfe4e9'
  surface-container-highest: '#d9dee3'
  on-surface: '#171c1e'
  on-surface-variant: '#49454e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#f1f1f1'
  outline: '#79747e'
  outline-variant: '#c4c7c5'
  surface-tint: '#006b7b'
  primary: '#00687b'
  on-primary: '#ffffff'
  primary-container: '#b1e9ff'
  on-primary-container: '#001f2a'
  inverse-primary: '#5dd9ff'
  secondary: '#4a6278'
  on-secondary: '#ffffff'
  secondary-container: '#cce5ff'
  on-secondary-container: '#051f35'
  tertiary: '#d4a5d4'
  on-tertiary: '#3e2c3e'
  tertiary-container: '#f5d9f5'
  on-tertiary-container: '#160016'
  error: '#b3261e'
  on-error: '#ffffff'
  error-container: '#f9dedc'
  on-error-container: '#410e0b'
  primary-fixed: '#b1e9ff'
  primary-fixed-dim: '#7dd3f0'
  on-primary-fixed: '#001f2a'
  on-primary-fixed-variant: '#004d5c'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#b0ccf0'
  on-secondary-fixed: '#051f35'
  on-secondary-fixed-variant: '#334860'
  tertiary-fixed: '#f5d9f5'
  tertiary-fixed-dim: '#dab8db'
  on-tertiary-fixed: '#160016'
  on-tertiary-fixed-variant: '#5d4a5d'
  background: '#f5f7f8'
  on-background: '#171c1e'
  surface-variant: '#dfe4e9'
typography:
  display:
    fontFamily: Gotham Rounded SSm A, Gotham Rounded SSm B, Roboto, sans-serif
    fontSize: 57px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: '-0.03em'
  headline-lg:
    fontFamily: Gotham Rounded SSm A, Gotham Rounded SSm B, Roboto, sans-serif
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: '-0.02em'
  headline-md:
    fontFamily: Gotham Rounded SSm A, Gotham Rounded SSm B, Roboto, sans-serif
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: '-0.01em'
  title-lg:
    fontFamily: Gotham Rounded SSm A, Gotham Rounded SSm B, Roboto, sans-serif
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Gotham Rounded SSm A, Gotham Rounded SSm B, Roboto, sans-serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.02em
  body-md:
    fontFamily: Gotham Rounded SSm A, Gotham Rounded SSm B, Roboto, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Gotham Rounded SSm A, Gotham Rounded SSm B, Roboto, sans-serif
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Gotham Rounded SSm A, Gotham Rounded SSm B, Roboto, sans-serif
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  container-max: 1280px
elevation:
  sm: 0 1px 3px rgba(0, 0, 0, 0.08)
  md: 0 3px 8px rgba(0, 0, 0, 0.15)
  lg: 0 8px 24px rgba(0, 0, 0, 0.12)
layout:
  containerMaxWidth: 1280px
  gridColumns: 12
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: 12px 32px
    height: 48px
    boxShadow: '{elevation.md}'
  button-primary-hover:
    backgroundColor: '#004d5c'
    boxShadow: '{elevation.lg}'
  button-primary-active:
    backgroundColor: '#003d47'
  button-secondary:
    backgroundColor: transparent
    textColor: '{colors.primary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: 12px 32px
    height: 48px
    border: 2px solid {colors.primary}
  button-secondary-hover:
    backgroundColor: '{colors.primary-container}'
    textColor: '{colors.on-primary-container}'
  card:
    backgroundColor: '{colors.surface-bright}'
    rounded: '{rounded.lg}'
    padding: '{spacing.md}'
    boxShadow: '{elevation.md}'
  card-hover:
    backgroundColor: '{colors.surface-container-low}'
    boxShadow: '{elevation.lg}'
  input-field:
    backgroundColor: '{colors.surface-container-low}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
    border: 1px solid {colors.outline-variant}
  input-field-focus:
    borderColor: '{colors.primary}'
    boxShadow: 0 0 0 3px rgba(0, 104, 123, 0.1)
  badge:
    backgroundColor: '{colors.tertiary-container}'
    textColor: '{colors.on-tertiary-container}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.full}'
    padding: 4px 12px
  list-item:
    backgroundColor: transparent
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
  list-item-hover:
    backgroundColor: '{colors.surface-container-high}'
    textColor: '{colors.primary}'
  chip:
    backgroundColor: '{colors.primary-container}'
    textColor: '{colors.on-primary-container}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: 8px 16px
    height: 32px
  chip-outlined:
    backgroundColor: transparent
    textColor: '{colors.primary}'
    border: 1px solid {colors.outline}
    rounded: '{rounded.full}'
    padding: 8px 16px
    height: 32px
---

## Overview

Journey.Cloud is a free online journal and diary platform that celebrates personal memory-keeping through a warm, emotionally intelligent interface. The brand embodies "Soft Modernism"—a design philosophy that blends contemporary minimalism with organic, approachable forms. The aesthetic evokes a sense of sanctuary: a digital home where memories feel safe, cherished, and beautifully preserved. The UI prioritizes emotional resonance over cold efficiency, using soft shadows (0 3px 8px rgba(0, 0, 0, 0.15)), generous whitespace, and a teal-to-warm color palette that feels both professional and intimate.

Journey's voice is warm, encouraging, and non-judgmental. The brand speaks to users as trusted companions in their personal narrative, using language that celebrates vulnerability and self-reflection. Vocabulary leans toward human moments ("memories," "moments," "home") rather than technical jargon. The tone is conversational yet respectful—never pushy, always inviting. Example sentence in brand voice: "Let's make a home for your memories."

## Colors

The color system centers on a teal primary (#00687b) that serves as the signature accent for all interactive elements—buttons, links, focus states, and key CTAs. This teal is grounded, trustworthy, and distinctly Journey's own. It appears on the "Start Journal" button (rgb(0, 104, 123) in computed styles) and all primary interactions. The surface stack progresses from #f5f7f8 (surface) through #e5eaef (surface-container) to #d9dee3 (surface-container-highest), creating subtle visual hierarchy without harsh contrast. On-surface text is #171c1e (near-black) for legibility at 14px body size. Secondary colors include a soft blue (#4a6278) for supporting UI and a warm mauve tertiary (#d4a5d4) used sparingly for badges and accent elements. Error states use #b3261e. The outline-variant (#c4c7c5)

## Typography

The type system uses Gotham Rounded SSm (with Roboto as fallback) across all scales, creating a cohesive, friendly voice. Display (57px, 700 weight) is reserved for hero moments; headline-lg (40px, 700) anchors major sections; headline-md (30px, 700) is used for card titles and subsections. Body-lg (18px, 400) and body-md (16px, 400) carry narrative content with generous line-height (28px and 24px respectively) to ensure readability and breathing room. Label-md (14px, 700) is applied to all button text and interactive labels, with letter-spacing of 0.02em to add subtle emphasis. The rounded typeface choice reinforces the brand's approachable, non-corporate personality. On small labels over busy backgrounds (e.g., memory badges), apply text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) to ensure leg

## Layout

The layout uses a fluid 12-column grid with a max-width of 1280px, allowing content to breathe on large screens while maintaining focus on smaller devices. The hero card (visible in the screenshot) uses centered alignment with 40px (lg spacing) margins on desktop, reducing to 24px (md spacing) on tablet. Container padding follows the gutter token (24px) on all sides. Section separation uses lg spacing (40px) vertically to create clear rhythm and prevent visual fatigue. The white-space philosophy prioritizes generous margins over dense packing: cards have 24px internal padding, buttons have 32px horizontal padding, and list items have 12px padding. This spacing scale—xs (4px), sm (12px), md (24px), lg (40px), xl (64px)—is applied consistently across all components, creating a predictable, c

## Elevation & Depth

Depth is conveyed through a three-tier shadow system that avoids harsh contrast while maintaining clear visual hierarchy. Level 1 (sm elevation: 0 1px 3px rgba(0, 0, 0, 0.08)) is applied to subtle UI elements like input fields and small cards, creating minimal separation from the surface. Level 2 (md elevation: 0 3px 8px rgba(0, 0, 0, 0.15)) is the standard for primary cards, buttons, and interactive components—this is the most frequently used shadow and defines the brand's soft-modern feel. Level 3 (lg elevation: 0 8px 24px rgba(0, 0, 0, 0.12)) is reserved for modals, overlays, and hover stat

## Shapes

The shape philosophy is "Soft Geometric"—combining technical precision with organic warmth. Buttons use full border-radius (9999px) to create pill-shaped forms that feel friendly and inviting; this is applied to all primary and secondary buttons (e.g., "Start Journal" button in the hero). Cards and containers use lg radius (16px), striking a balance between modern sharpness and approachability. Input fields and smaller UI elements use md radius (12px). The full radius on buttons is intentional: it signals that these are safe, welcoming actions, not rigid commands. Chips and badges also use ful

## Components

### Action Elements
Buttons are the primary interaction mechanism. Primary buttons (button-primary) use the teal primary color (#00687b) with white text, 12px vertical and 32px horizontal padding, and full border-radius (9999px). On hover, the background darkens to #004d5c with an lg shadow (0 8px 24px rgba(0, 0, 0, 0.12)) to signal interactivity. The transition occurs over 200ms. Secondary buttons (button-secondary) are transparent with a 2px border in primary color and matching text; on hover, they fill with primary-container (#b1e9ff) and shift text to on-primary-container (#001f2a). Chips (chip) use primary-container background with on-primary-container text, full radius, and 8px vertical / 16px horizontal padding. All button text uses label-md typography (14px, 700 weight, 0.02em lett

## Do's and Don'ts

**Do**
- Do use the teal primary (#00687b) exclusively for CTAs, focus states, and key interactive elements—it's the brand's signature accent and should never be diluted or overused.
- Do apply md elevation shadow (0 3px 8px rgba(0, 0, 0, 0.15)) to cards and containers as the default; reserve lg shadow for hover and modal states.
- Do maintain generous whitespace: 24px padding inside cards, 40px between sections, and 32px horizontal padding on buttons—this breathing room is core to the brand's emotional positioning.
- Do use Gotham Rounded SSm for all typography; the rounded forms are essential to the approachable, warm personality and should never be substituted with geometric or serif typefaces.
- Do apply full border-radius (9999px) to all buttons and chips to signal safety and approachability; this shape choice is distinctive to Journey and reinforces the brand's non-judgmental stance.

**Don't**
- Don't use harsh shadows (anything above lg elevation) on standard UI elements; the soft-modern aesthetic depends on subtle, diffused depth that never feels aggressive.
- Don't apply the primary teal to backgrounds or large surface areas—it's an accent color for interactive elements only. Backgrounds should remain in the surface stack (#f5f7f8 to #d9dee3).
- Don't reduce padding below the spacing scale minimums (xs: 4px, sm: 12px); the generous whitespace is intentional and cramped layouts contradict the reflective, sanctuary-like brand positioning.
- Don't mix typefaces—Gotham Rounded SSm is the system typeface across all scales. Substituting with system fonts or serif alternatives breaks visual cohesion and dilutes the friendly voice.
- Don't use sharp border-radius (0px or 4px) on buttons or primary interactive elements; the rounded pill shape is a signature brand element and switching to sharp corners signals a different, more corporate personality.
