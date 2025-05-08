/**
 * Parameters required to calculate pagination query values.
 *
 * @property page - The current page number (0-indexed).
 * @property rowsPerPage - The number of items to display per page.
 *
 * @example
 * {
 *   page: 2,
 *   rowsPerPage: 10
 * }
 * // Refers to items 20–29
 *  
 * @author BCFCODE
 * @version 1.0.0
 */
export interface PaginationParams {
  page: number;
  rowsPerPage: number;
}

/**
 * Computes the `skip` and `limit` values for a pagination query based on
 * the current page and number of rows per page.
 *
 * This utility is typically used when paginating data in an API or local state,
 * particularly for data fetching scenarios like:
 * - `GET /items?skip=20&limit=10`
 *
 * @param params - An object containing the current `page` (0-based) and `rowsPerPage`.
 *
 * @returns An object with:
 * - `skip`: The number of items to skip (e.g., `page * rowsPerPage`)
 * - `limit`: The number of items to fetch per page.
 *
 * @example
 * const query = setQuerySkipAndLimit({ page: 2, rowsPerPage: 10 });
 * // query = { skip: 20, limit: 10 }
 *
 * @remarks
 * This function follows 0-based pagination (i.e., page 0 is the first page).
 * It’s ideal for APIs and data layers where paginated queries are built manually.
 * 
 * @author BCFCODE
 * @since 2025-05
 * @version 1.0.0
 */
const setQuerySkipAndLimit = ({ page, rowsPerPage }: PaginationParams) => {
  const skip = page * rowsPerPage;
  const limit = rowsPerPage;
  return { skip, limit };
};

export default setQuerySkipAndLimit;
