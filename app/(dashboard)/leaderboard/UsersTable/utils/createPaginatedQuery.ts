import { PaginationQuery } from "@/app/services/db";

/**
 * Parameters for paginated data queries.
 *
 * @property page - The current page number (0-indexed).
 * @property rowsPerPage - The number of items per page.
 *
 * @example
 * {
 *   page: 2,
 *   rowsPerPage: 10
 * }
 * // Refers to items 20 through 29
 *
 * @since 2025-05
 * @version 1.2.0
 * @author BCFCODE
 */
export interface PaginationParams {
  page: number;
  rowsPerPage: number;
}

/**
 * Creates a pagination query object with calculated values for
 * paginated API calls, including `skip`, `limit`, and `apiPageNumber`.
 *
 * @param params - Pagination parameters including `page` (0-based) and `rowsPerPage`.
 *
 * @returns An object including:
 * - `page`: The current frontend page.
 * - `rowsPerPage`: Number of items per frontend page.
 * - `skip`: Number of items to skip (used in query params).
 * - `limit`: Number of items to fetch (usually equal to `rowsPerPage`).
 * - `apiPageNumber`: Backend page index assuming 200 items per API page.
 *
 * @example
 * const query = createPaginationQuery({ page: 21, rowsPerPage: 10 });
 * // query = { page: 21, rowsPerPage: 10, skip: 210, limit: 10, apiPageNumber: 1 }
 *
 * @remarks
 * `apiPageNumber` increases by 1 for every 200 skipped items.
 * Useful when frontend pagination is finer than backend pagination.
 *
 * @since 2025-05
 * @version 1.2.0
 */
const createPaginationQuery = ({
  page,
  rowsPerPage,
}: PaginationParams): PaginationQuery => {
  const skip = page * rowsPerPage;
  const limit = rowsPerPage;

  // Each backend API page contains 200 items
  const apiPageNumber = Math.floor(skip / 200);

  return {
    page,
    rowsPerPage,
    skip,
    limit,
    apiPageNumber,
  };
};

export default createPaginationQuery;
