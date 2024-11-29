function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
  // Calculate the total number of pages needed based on the posts per page
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Create an array of page numbers starting from 1 up to totalPages
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center items-center p-4 gap-2 mt-6">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 mx-1 mb-2 sm:mb-0 border rounded-lg transition-all 
      ${
        page === currentPage
          ? "bg-[#C586A5] text-white border-[#C586A5]"
          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
      } 
      text-sm sm:text-base md:text-lg
      flex-shrink-0`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
