import { createTheme, type MantineColorsTuple } from '@mantine/core';

const indigo: MantineColorsTuple = [
  '#eef2ff',
  '#e0e7ff',
  '#c7d2fe',
  '#a5b4fc',
  '#818cf8',
  '#6366f1',
  '#4f46e5',
  '#4338ca',
  '#3730a3',
  '#312e81',
];

const cyan: MantineColorsTuple = [
  '#ecfeff',
  '#cffafe',
  '#a5f3fc',
  '#67e8f9',
  '#22d3ee',
  '#06b6d4',
  '#0891b2',
  '#0e7490',
  '#155e75',
  '#164e63',
];

export const theme = createTheme({
  primaryColor: 'indigo',
  colors: { indigo, cyan },
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '0.95rem',
    lg: '1.1rem',
    xl: '1.25rem',
  },
  lineHeights: {
    md: '1.6',
  },
  components: {
    Card: {
      defaultProps: { withBorder: true, shadow: 'none' },
      styles: {
        root: {
          '--card-bg': 'light-dark(#ffffff, #1e1e2e)',
        },
      },
    },
    Button: {
      defaultProps: { radius: 'md' },
    },
    AppShell: {
      styles: {
        navbar: {
          '--app-shell-navbar-bg': 'light-dark(#f8f9fa, #141420)',
        },
        header: {
          '--app-shell-header-bg': 'light-dark(#ffffff, #1a1a2e)',
          borderBottom: '1px solid light-dark(#e9ecef, #2d2d44)',
        },
      },
    },
    NavLink: {
      styles: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});