import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, SortAsc, SortDesc, Maximize2, Minimize2 } from 'lucide-react';
import { useContentExpansion } from '@/hooks/use-content-expansion';

interface ColumnDef<TData> {
  id: string;
  header: string | React.ReactNode;
  cell: (row: TData) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
}

interface DataTableProps<TData extends object> {
  columns: ColumnDef<TData>[];
  data: TData[];
  emptyMessage?: string;
  rowsPerPage?: number;
  searchPlaceholder?: string;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
}

function DataTable<TData extends object>({
  columns,
  data,
  emptyMessage = 'No data found.',
  rowsPerPage = 10,
  searchPlaceholder = 'Search...',
  title,
  subtitle,
  actions,
  filters,
}: DataTableProps<TData>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const { isContentExpanded } = useContentExpansion();

  // Adjust rows per page based on expansion state
  const effectiveRowsPerPage = isContentExpanded ? rowsPerPage * 2 : rowsPerPage;

  const filteredData = useMemo(() => {
    // Ensure data is an array before filtering
    if (!Array.isArray(data)) {
      console.warn('DataTable: data prop is not an array:', data);
      return [];
    }
    
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortBy as keyof TData];
      const bValue = b[sortBy as keyof TData];

      if (aValue === bValue) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      return sortAsc ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [filteredData, sortBy, sortAsc]);

  const paginatedData = useMemo(() => {
    const start = page * effectiveRowsPerPage;
    return sortedData.slice(start, start + effectiveRowsPerPage);
  }, [sortedData, page, effectiveRowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / effectiveRowsPerPage);

  const handleSort = (columnId: string) => {
    if (sortBy === columnId) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(columnId);
      setSortAsc(true);
    }
  };

  // Early return if data is not valid
  if (!Array.isArray(data)) {
    return (
      <div className="w-full space-y-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="text-muted-foreground mb-2">⚠️</div>
              <h3 className="text-lg font-semibold">Invalid Data</h3>
              <p className="text-sm text-muted-foreground">
                Expected an array but received: {typeof data}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header section */}
      {(title || subtitle || actions) && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Search and filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full sm:w-80 pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
        </div>
        
        {filters && (
          <div className="flex flex-wrap gap-2 items-center">
            {filters}
          </div>
        )}
      </div>

      {/* Enhanced Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    onClick={() => handleSort(column.id)}
                    className={`group cursor-pointer px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${column.headerClassName || ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{column.header}</span>
                      <div className="flex items-center ml-2">
                        {sortBy === column.id ? (
                          sortAsc ? (
                            <SortAsc className="h-4 w-4 text-blue-500" />
                          ) : (
                            <SortDesc className="h-4 w-4 text-blue-500" />
                          )
                        ) : (
                          <div className="h-4 w-4 opacity-0 group-hover:opacity-50">
                            <SortAsc className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    {columns.map((column) => (
                      <td
                        key={`${column.id}-${rowIndex}`}
                        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white ${column.cellClassName || ''}`}
                      >
                        {column.cell(row)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8" />
                      </div>
                      <p className="text-lg font-medium">{emptyMessage}</p>
                      <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination and Entries Info */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing{' '}
                <span className="font-medium text-gray-900 dark:text-white">
                  {filteredData.length > 0 ? page * effectiveRowsPerPage + 1 : 0}
                </span>{' '}
                to{' '}
                <span className="font-medium text-gray-900 dark:text-white">
                  {Math.min((page + 1) * effectiveRowsPerPage, filteredData.length)}
                </span>{' '}
                of{' '}
                <span className="font-medium text-gray-900 dark:text-white">
                  {filteredData.length}
                </span>{' '}
                entries
                {isContentExpanded && (
                  <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                    Expanded View
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Filter className="h-4 w-4" />
                <span>
                  {filteredData.length} of {data.length} records
                </span>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(0)}
                  className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                
                <button
                  disabled={page === 0}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-4">
                  Page {page + 1} of {totalPages}
                </span>

                <button
                  disabled={page + 1 >= totalPages}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                  className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  disabled={page + 1 >= totalPages}
                  onClick={() => setPage(totalPages - 1)}
                  className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
export { DataTable };
