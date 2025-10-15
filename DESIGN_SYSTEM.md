# Connect - Design System

## Color Palette

### Primary Colors
- **Background:** `#F5F1ED` (Soft beige/cream)
- **Surface:** `#FFFFFF` (White for cards and elevated surfaces)
- **Surface Secondary:** `#FAF8F6` (Slightly darker cream)

### Accent Colors
- **Primary Accent:** `#9B87C4` (Muted purple)
- **Secondary Accent:** `#B8A5D9` (Light purple)
- **Tertiary Accent:** `#7B68A8` (Deep purple)

### Text Colors
- **Primary Text:** `#1A1A1A` (Near black)
- **Secondary Text:** `#6B6B6B` (Medium gray)
- **Tertiary Text:** `#9E9E9E` (Light gray)
- **On Accent:** `#FFFFFF` (White on purple)

### Semantic Colors
- **Success:** `#6BB56B` (Muted green)
- **Error:** `#D97B7B` (Muted red)
- **Warning:** `#E8B563` (Muted orange)
- **Info:** `#7BA8D9` (Muted blue)

## Typography

### Font Families
- **Headings:** `'Playfair Display', serif` (Elegant, classic)
- **Body:** `'Inter', sans-serif` (Clean, modern)
- **UI Elements:** `'Inter', sans-serif`

### Font Sizes
- **H1:** 2.5rem (40px) - Page titles
- **H2:** 2rem (32px) - Section headers
- **H3:** 1.5rem (24px) - Card titles
- **H4:** 1.25rem (20px) - Subsections
- **Body:** 1rem (16px) - Main content
- **Small:** 0.875rem (14px) - Secondary info
- **Tiny:** 0.75rem (12px) - Timestamps, labels

### Font Weights
- **Light:** 300
- **Regular:** 400
- **Medium:** 500
- **Semibold:** 600
- **Bold:** 700

## Spacing System

Using 8px base unit:
- **xs:** 0.25rem (4px)
- **sm:** 0.5rem (8px)
- **md:** 1rem (16px)
- **lg:** 1.5rem (24px)
- **xl:** 2rem (32px)
- **2xl:** 3rem (48px)
- **3xl:** 4rem (64px)

## Border Radius

- **sm:** 0.5rem (8px) - Small elements
- **md:** 0.75rem (12px) - Buttons, inputs
- **lg:** 1rem (16px) - Cards
- **xl:** 1.5rem (24px) - Large cards
- **2xl:** 2rem (32px) - Hero elements
- **full:** 9999px - Pills, avatars

## Shadows

- **sm:** `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **md:** `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- **lg:** `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- **xl:** `0 20px 25px -5px rgba(0, 0, 0, 0.1)`
- **2xl:** `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

## Components

### Buttons

#### Primary Button
- Background: Muted purple gradient
- Text: White
- Padding: 12px 24px
- Border radius: md
- Hover: Slightly darker, scale 1.02
- Active: Scale 0.98

#### Secondary Button
- Background: White
- Border: 2px solid muted purple
- Text: Muted purple
- Padding: 12px 24px
- Border radius: md
- Hover: Background light purple tint

#### Ghost Button
- Background: Transparent
- Text: Primary text
- Padding: 12px 24px
- Hover: Background light gray

### Cards

#### Standard Card
- Background: White
- Border radius: xl
- Shadow: lg
- Padding: lg
- Hover: Shadow xl, translate Y -2px

#### Profile Card
- Background: White
- Border radius: 2xl
- Shadow: xl
- Image: Full width, rounded top
- Content padding: xl
- Hover: Shadow 2xl, scale 1.02

### Inputs

#### Text Input
- Background: White
- Border: 1px solid light gray
- Border radius: md
- Padding: 12px 16px
- Focus: Border purple, shadow purple glow

#### Select/Dropdown
- Background: White
- Border: 1px solid light gray
- Border radius: md
- Padding: 12px 16px
- Icon: Chevron down
- Focus: Border purple

### Navigation

#### Bottom Tab Bar
- Background: White
- Shadow: lg (top)
- Height: 64px
- Icons: 24px
- Active: Purple
- Inactive: Gray

#### Floating Action Button
- Background: Purple gradient
- Size: 56px
- Border radius: full
- Shadow: xl
- Icon: White, 24px
- Position: Fixed bottom-right

## Animations

### Transitions
- **Default:** `all 0.2s ease-in-out`
- **Slow:** `all 0.3s ease-in-out`
- **Fast:** `all 0.15s ease-in-out`

### Hover Effects
- **Scale:** `transform: scale(1.02)`
- **Lift:** `transform: translateY(-2px)`
- **Glow:** Increase shadow

### Loading States
- **Skeleton:** Shimmer animation
- **Spinner:** Rotating circle
- **Progress:** Animated bar

## Iconography

- **Style:** Lucide React icons
- **Size:** 20px (small), 24px (medium), 32px (large)
- **Stroke width:** 2px
- **Color:** Inherit from parent

## Layout

### Container
- Max width: 1200px
- Padding: lg (mobile), xl (tablet), 2xl (desktop)
- Margin: auto

### Grid
- Columns: 12
- Gap: md (mobile), lg (tablet), xl (desktop)

### Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## Accessibility

- **Contrast ratio:** Minimum 4.5:1 for text
- **Touch targets:** Minimum 44x44px
- **Focus indicators:** Visible outline
- **Alt text:** Required for all images
- **ARIA labels:** For interactive elements

