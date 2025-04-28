/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Meta } from "../types/interface";

interface NavigationProps {
  data: Meta;
  page: number;
  setPage: (page: number) => void;
}
export default function Navigation({
  data,
  page,
  setPage,
}: NavigationProps): React.ReactElement {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">{data?.showing}</p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              disabled={data?.currentPage === 1}
              style={{ cursor: "pointer" }}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (data?.currentPage !== 1) {
                  setPage(page - 1);
                }
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              style={{ cursor: "pointer" }}
              aria-current="page"
              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {data?.currentPage}
            </button>

            <button
              disabled={data?.currentPage === data?.totalPages}
              style={{ cursor: "pointer" }}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (data?.currentPage !== data?.totalPages) {
                  setPage(page + 1);
                }
              }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
