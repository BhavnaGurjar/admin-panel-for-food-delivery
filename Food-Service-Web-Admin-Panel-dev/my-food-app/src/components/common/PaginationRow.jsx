const PaginationRow = ({
  totalResults = 100,
  resultsPerPage = 10,
  currentPage = 1,
  onPageChange = () => {},
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const PaginationButton = ({ children, onClick, disabled, active }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-[2.2rem] h-[2.2rem] mx-0.5 rounded-lg text-sm border border-[#e2e0e0] ${
        disabled
          ? "cursor-not-allowed"
          : active
          ? "bg-primary border-primary text-white"
          : "hover:bg-[rgba(241,241,241,1)]"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-row items-center justify-between mt-3 mb-0 font-satoshi">
      <div className="text-[1rem] text-gray-400 font-medium">
        Showing {startResult} - {endResult} of {totalResults} results
      </div>

      <div className="flex items-center">
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lsaquo;
        </PaginationButton>

        {[...Array(totalPages).keys()].map((page) => {
          const pageNumber = page + 1;
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            Math.abs(currentPage - pageNumber) <= 2
          ) {
            return (
              <PaginationButton
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationButton>
            );
          }

          if (
            pageNumber === currentPage - 3 ||
            pageNumber === currentPage + 3
          ) {
            return (
              <span key={pageNumber} className="px-2 text-gray-500">
                &hellip;
              </span>
            );
          }

          return null;
        })}

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        
        >
          &rsaquo;
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </PaginationButton>
      </div>
    </div>
  );
};

export default PaginationRow;
