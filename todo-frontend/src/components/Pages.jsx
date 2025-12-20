function Pages({ page, totalPages, goPrev, goNext }) {
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
    </div>
  );
}

export default Pages;
