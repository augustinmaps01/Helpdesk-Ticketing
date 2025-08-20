import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  HeaderGroup,
  RowSelectionState,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  Database,
  Eye,
  FileText,
  Filter,
  Loader2,
  RefreshCw,
  Search,
  Settings2
} from "lucide-react";

// --- New Interface for Custom Header ---
interface CustomHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
}

// --- Table Density Type ---
type TableDensity = "compact" | "comfortable" | "relaxed";

// --- Export Format Type ---
type ExportFormat = "csv" | "json";

// --- Updated DataTableProps Interface ---
interface DataTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  headerComponent?: React.FC<CustomHeaderProps<T>>;
  loading?: boolean;
  onRefresh?: () => void;
  enableRowSelection?: boolean;
  enableColumnFilters?: boolean;
  enableExport?: boolean;
  enableColumnVisibility?: boolean;
  enableDensityToggle?: boolean;
  title?: string;
  description?: string;
}

export default function DataTable<T extends object>({
  data,
  columns,
  headerComponent: CustomHeader,
  loading = false,
  onRefresh,
  enableRowSelection = false,
  enableColumnFilters = false,
  enableExport = false,
  enableColumnVisibility = false,
  enableDensityToggle = false,
  title,
  description,
}: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [density, setDensity] = useState<TableDensity>("comfortable");
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);
  
  // Refs for click-away handlers
  const columnVisibilityRef = useRef<HTMLDivElement>(null);

  // Add row selection column when enabled
  const enhancedColumns = useMemo(() => {
    if (!enableRowSelection) return columns;
    
    const selectionColumn: ColumnDef<T> = {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="rounded border-gray-300"
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="rounded border-gray-300"
          aria-label={`Select row ${row.index + 1}`}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    };
    
    return [selectionColumn, ...columns] as ColumnDef<T>[];
  }, [columns, enableRowSelection]);

const table = useReactTable({
  data,
  columns: enhancedColumns,
  state: { 
    globalFilter, 
    rowSelection, 
    columnFilters, 
    sorting, 
    columnVisibility 
  },
  onGlobalFilterChange: setGlobalFilter,
  onRowSelectionChange: setRowSelection,
  onColumnFiltersChange: setColumnFilters,
  onSortingChange: setSorting,
  onColumnVisibilityChange: setColumnVisibility,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  enableRowSelection: enableRowSelection,
  debugTable: false,
});

  const memoizedRows = useMemo(() => table.getRowModel().rows, [table]);

  // Export functionality
  const exportData = useCallback((format: ExportFormat) => {
    const rows = table.getFilteredRowModel().rows;
    const data = rows.map(row => row.original);
    
    // Get visible columns for export (exclude selection column)
    const exportableColumns = enhancedColumns.filter(col => 
      col.id !== "select" && table.getColumn(col.id!)?.getIsVisible() !== false
    );
    
    if (format === "csv") {
      // Create headers
      const headers = exportableColumns.map(col => {
        const header = typeof col.header === "string" ? col.header : col.id || col.accessorKey;
        return `"${String(header).replace(/"/g, '""')}"`;
      }).join(",");
      
      // Create rows with proper typing
      const csvRows = data.map((rowData: T) => 
        exportableColumns.map(col => {
          let value: unknown = "";
          
          // Handle different column accessor patterns without any types
          if (col.accessorFn && typeof col.accessorFn === 'function') {
            value = col.accessorFn(rowData, 0);
          } else if (col.accessorKey) {
            // Use Record type for safe property access
            const record = rowData as Record<string, unknown>;
            value = record[col.accessorKey as string];
          } else if (col.id) {
            const record = rowData as Record<string, unknown>;
            value = record[col.id];
          }
          
          // Convert to string and escape quotes
          const stringValue = value != null ? String(value) : "";
          return `"${stringValue.replace(/"/g, '""')}"`;
        }).join(",")
      );
      
      const csv = [headers, ...csvRows].join("\n");
      
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "table-data"}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === "json") {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "table-data"}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [table, enhancedColumns, title]);

  // Density styles
  const getDensityStyles = () => {
    switch (density) {
      case "compact":
        return "p-2 text-xs";
      case "relaxed":
        return "p-6 text-base";
      default:
        return "p-4 text-sm";
    }
  };

  // Click-away handler for dropdowns
  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (columnVisibilityRef.current && !columnVisibilityRef.current.contains(event.target as Node)) {
        setShowColumnVisibility(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "r":
            e.preventDefault();
            onRefresh?.();
            break;
          case "f":
            e.preventDefault();
            setShowColumnFilters(!showColumnFilters);
            break;
        }
      }
      // ESC key to close dropdowns
      if (e.key === "Escape") {
        setShowColumnVisibility(false);
        setShowColumnFilters(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onRefresh, showColumnFilters]);

  const DefaultHeader = useMemo(() => {
    const HeaderComponent: React.FC<CustomHeaderProps<T>> = ({ headerGroups }) => (
      <thead className="bg-gray-100 dark:bg-gray-800">
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 cursor-pointer whitespace-nowrap"
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className="flex items-center gap-1">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <ArrowUp size={14} />,
                    desc: <ArrowDown size={14} />,
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
    );
    return HeaderComponent;
  }, []);

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col space-y-4">
        {(title || description) && (
          <div>
            {title && <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{title}</h2>}
            {description && <p className="text-gray-600 dark:text-gray-400">{description}</p>}
          </div>
        )}

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left side - Search */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search across all columns..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8"
                aria-label="Global search"
              />
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center space-x-2">
            {enableColumnFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowColumnFilters(!showColumnFilters)}
                className={showColumnFilters ? "bg-gray-100 dark:bg-gray-700" : ""}
                aria-expanded={showColumnFilters}
                aria-controls="column-filters"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            )}

            {enableColumnVisibility && (
              <div className="relative" ref={columnVisibilityRef}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowColumnVisibility(!showColumnVisibility)}
                  className={showColumnVisibility ? "bg-gray-100 dark:bg-gray-700" : ""}
                  aria-expanded={showColumnVisibility}
                  aria-haspopup="true"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Columns
                </Button>
                {showColumnVisibility && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 p-2">
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {table.getAllColumns()
                        .filter(column => column.getCanHide())
                        .map(column => (
                          <div key={column.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={column.getIsVisible()}
                              onChange={column.getToggleVisibilityHandler()}
                              className="rounded border-gray-300"
                              id={`column-${column.id}`}
                            />
                            <label 
                              htmlFor={`column-${column.id}`}
                              className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer"
                            >
                              {column.id}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {enableDensityToggle && (
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const densities: TableDensity[] = ["compact", "comfortable", "relaxed"];
                    const currentIndex = densities.indexOf(density);
                    const nextIndex = (currentIndex + 1) % densities.length;
                    setDensity(densities[nextIndex]);
                  }}
                >
                  <Settings2 className="h-4 w-4 mr-2" />
                  {density}
                </Button>
              </div>
            )}

            {enableExport && (
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData("csv")}
                  disabled={loading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData("json")}
                  disabled={loading}
                >
                  <Database className="h-4 w-4 mr-2" />
                  JSON
                </Button>
              </div>
            )}

            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Column Filters */}
        {enableColumnFilters && showColumnFilters && (
          <div 
            id="column-filters"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            role="region"
            aria-label="Column filters"
          >
            {table.getAllColumns()
              .filter(column => column.getCanFilter())
              .map(column => (
                <div key={column.id}>
                  <label 
                    htmlFor={`filter-${column.id}`}
                    id={`filter-${column.id}-label`}
                    className="block text-sm font-medium mb-1"
                  >
                    {column.id}
                  </label>
                  <Input
                    id={`filter-${column.id}`}
                    placeholder={`Filter ${column.id}...`}
                    value={(column.getFilterValue() as string) ?? ""}
                    onChange={(e) => column.setFilterValue(e.target.value)}
                    className="w-full"
                    aria-describedby={`filter-${column.id}-label`}
                  />
                </div>
              ))}
          </div>
        )}

        {/* Selection Info */}
        {enableRowSelection && Object.keys(rowSelection).length > 0 && (
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <span className="text-sm font-medium">
              {Object.keys(rowSelection).length} of {table.getFilteredRowModel().rows.length} row(s) selected
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRowSelection({})}
            >
              Clear selection
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-10 rounded-lg">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label={title || "Data table"}>
              {CustomHeader ? (
                <CustomHeader headerGroups={table.getHeaderGroups()} />
              ) : (
                <DefaultHeader headerGroups={table.getHeaderGroups()} />
              )}
              <tbody>
                {memoizedRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={table.getAllColumns().length}
                      className="h-32 text-center text-gray-500 dark:text-gray-400"
                    >
                      {loading ? "Loading..." : "No results found."}
                    </td>
                  </tr>
                ) : (
                  memoizedRows.map((row) => (
                    <tr
                      key={row.id}
                      className={`border-t transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                        row.getIsSelected() ? "bg-gray-100 dark:bg-gray-800" : ""
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className={`whitespace-nowrap ${getDensityStyles()}`}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enhanced Pagination */}
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
          {enableRowSelection && (
            <span className="ml-4">
              ({Object.keys(rowSelection).length} selected)
            </span>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Rows per page</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="h-8 w-20 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 text-sm"
              aria-label="Select page size"
            >
              {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">Page</span>
              <Input
                type="number"
                min="1"
                max={table.getPageCount()}
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="w-16 h-8"
                aria-label="Go to page"
              />
              <span className="text-sm">of {table.getPageCount()}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
