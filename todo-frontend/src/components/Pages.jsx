
function Pages({currentPage, totalPages, goPrev, goNext}) {
return (
<div className="flex items-center justify-between mt-4">
  <button
    onClick={goPrev}
    disabled={currentPage === 0}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span className="text-sm text-gray-600">
    Page {currentPage + 1} of {totalPages}
  </span>

  <button
    onClick={goNext}
    disabled={currentPage >= totalPages - 1}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
    )
}

export default Pages