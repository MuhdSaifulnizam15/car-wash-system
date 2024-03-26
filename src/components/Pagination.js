import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
  total = 0,
  current = 0,
  limit = 10,
  offset = 1,
  hasNextPage = false,
  hasPreviousPage = false,
  prevPage = null,
  nextPage = null,
  totalPage = 0,
  pagingCounter = 0,
  onPageChange = () => {},
  siblingCount = 1,
}) => {
  const onNext = () => {
    if (totalPage > current) onPageChange(current + 1);
  };

  const onPrevious = () => {
    if (current - 1 > 0) onPageChange(current - 1);
  };

  const lastPagingRecord = () => {
    if (total - pagingCounter >= 10) return pagingCounter + 9;
    else return pagingCounter + (total - pagingCounter);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between">
        <li
          onClick={onPrevious}
          className="relative inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-gray-50"
        >
          Previous
        </li>
        <li
          onClick={onNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </li>
      </div>
    </div>
  );
};

export default Pagination;
