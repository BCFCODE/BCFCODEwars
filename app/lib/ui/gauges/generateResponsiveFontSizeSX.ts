export interface ResponsiveFontSizeBreakpoint {
  minWidth: number;
  fontSize: number;
}

/**
 * Generates a responsive MUI `sx` style object with font sizes per breakpoint.
 *
 * @param breakpoints - An array of screen width and font size pairs
 * @returns An sx-compatible object with media queries as keys
 */
const generateResponsiveFontSizeSX = (
  fontSizeBreakpoints: ResponsiveFontSizeBreakpoint[]
): Record<string, { fontSize: number }> =>
  fontSizeBreakpoints.reduce(
    (acc, { minWidth, fontSize }) => {
      acc[`@media (min-width: ${minWidth}px)`] = { fontSize };
      return acc;
    },
    {} as Record<string, { fontSize: number }>
  );

export default generateResponsiveFontSizeSX;
