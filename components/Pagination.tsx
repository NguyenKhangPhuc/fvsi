'use client'

/**
 * PURPOSE:
 * A generic and reusable client-side Pagination component. It displays pagination controls
 * with padded two-digit page numbers (e.g., "01", "02") and handles intermediate ellipsis
 * for scaling page counts.
 *
 * CONTEXT/PARENT FILE:
 * Located in 'components/Pagination.tsx'.
 * Follows the centralized light design tokens (#00c2b2 teal, slate borders, white buttons).
 *
 * INPUTS / PARAMETERS:
 * - currentPage (number, Required): The current active page number (1-indexed).
 * - totalPages (number, Required): The total number of pages available.
 * - onPageChange ((page: number) => void, Required): Callback invoked when a user clicks a page number or arrow.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  /**
   * BEHAVIORAL MECHANISM:
   * Pads numbers to two digits (e.g. 1 becomes "01") to match the technical console typography.
   *
   * PARAMETERS:
   * - num (number): The page number.
   *
   * RETURNS:
   * - string: Two-character padded representation of the number.
   */
  const formatPageNumber = (num: number): string => {
    return String(num).padStart(2, '0')
  }

  /**
   * BEHAVIORAL MECHANISM:
   * Computes the visible page numbers, including first, last, current, and surrounding pages,
   * injecting null/ellipses where pages are skipped.
   *
   * PARAMETERS:
   * None.
   *
   * RETURNS:
   * - Array<number | string>: An array of visible page numbers or string indicators (ellipses).
   */
  const getVisiblePages = (): Array<number | string> => {
    const range: Array<number | string> = []
    const delta = 1 // Numbers to show before and after current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i)
      } else if (range[range.length - 1] !== '...') {
        range.push('...')
      }
    }
    return range
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center gap-2 mt-8 select-none">
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 disabled:opacity-30 disabled:pointer-events-none hover:text-[#4bbca9] hover:border-[#4bbca9]/50 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs"
        aria-label="Previous page"
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs"
            >
              ...
            </span>
          )
        }

        const isCurrent = page === currentPage
        return (
          <button
            type="button"
            key={`page-${page}`}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              isCurrent
                ? 'bg-[#4bbca9] text-white font-bold border border-[#3ea694] shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:text-[#4bbca9] hover:border-[#4bbca9]/50 hover:bg-slate-50 shadow-2xs'
            }`}
          >
            {formatPageNumber(page as number)}
          </button>
        )
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 disabled:opacity-30 disabled:pointer-events-none hover:text-[#4bbca9] hover:border-[#4bbca9]/50 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs"
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  )
}
