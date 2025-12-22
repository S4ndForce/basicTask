function Pages({ page, size, totalPages, goPrev, goNext, setFilters }) {
  return (
    <div className="flex items-center justify-between mt-4 gap-4">
      <button
        onClick={goPrev}
        disabled={page === 0}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm text-gray-600">
        Page {page + 1} of {totalPages}
      </span>

      <button
        onClick={goNext}
        disabled={page >= totalPages - 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>

       <select
        value={size}
        onChange={(e) =>
          setFilters(prev => ({
            ...prev,
            size: Number(e.target.value),
            page: 0
          }))
        }
        className="border px-2 py-1 rounded"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

    </div>
  );
}

export default Pages;
