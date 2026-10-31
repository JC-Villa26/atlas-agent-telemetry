/**
 * JS media queries that mirror Tailwind's md / lg / xl breakpoints. They use the same rem values as
 * the compiled CSS, so JS-driven layouts switch at the same width as the CSS ones at any browser
 * font size (a px query would not scale with the user's default font size and could disagree).
 */
export const BREAKPOINTS = {
  /** 768px at the default 16px font. */
  md: '(min-width: 48rem)',
  /** 1024px at the default 16px font. */
  lg: '(min-width: 64rem)',
  /** 1280px at the default 16px font. */
  xl: '(min-width: 80rem)',
} as const
