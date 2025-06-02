/**
 * A subset of allowed style properties for responsive design.
 * Extend this interface cautiously to include only properties supported in the `sx` prop context.
 */
export interface ResponsiveSX {
  /** Font size in pixels (required) */
  fontSize: number;

  /**
   * Optional top margin in pixels or "initial".
   * Accepts a number (px) or the literal CSS value "initial".
   */
  marginTop?: number | "initial";
}

/**
 * Defines a responsive breakpoint with a minimum screen width
 * and the corresponding style object to apply at that breakpoint.
 */
export interface ResponsiveBreakpoint {
  /** Minimum screen width (in pixels) at which these styles apply */
  minWidth: number;

  /** Style definitions that should apply from the given minWidth */
  sx: ResponsiveSX;
}

/**
 * Generates a responsive style object compatible with MUI's `sx` prop.
 *
 * The function returns an object containing media queries as keys
 * and corresponding style definitions as values.
 *
 * Example return:
 * ```ts
 * {
 *   "@media (min-width: 600px)": { fontSize: 16, marginTop: 20 },
 *   "@media (min-width: 960px)": { fontSize: 18 }
 * }
 * ```
 *
 * @param breakpoints - Array of responsive breakpoint definitions
 * @returns An `sx`-compatible object keyed by media queries
 */
const generateResponsiveSX = (
  fontSizeBreakpoints: ResponsiveBreakpoint[]
): Record<string, ResponsiveSX> =>
  fontSizeBreakpoints.reduce(
    (acc, { minWidth, sx: { fontSize, marginTop } }) => {
      acc[`@media (min-width: ${minWidth}px)`] = {
        fontSize,
        marginTop: marginTop ?? "initial",
      };
      return acc;
    },
    {} as Record<string, ResponsiveSX>
  );

export default generateResponsiveSX;
