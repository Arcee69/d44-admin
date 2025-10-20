import React, { Fragment } from "react";
import {
  useTable,
  useGlobalFilter,
  useRowSelect,
  useExpanded,
} from "react-table";
// import { List, ListItem, IconButton } from "@material-ui/core";
// import { Close } from "@material-ui/icons";
import PaginationControlled from "./Pagination";
// import Text from "./Typography/Typography"; 
// import Button from "./Button";
import emptyIllustration from "../assets/icons/emptyIllustration.svg";
import SearchBar from "./SearchBar";
// import Spinner from "./Spinner";

const Table2 = ({
  columns: userColumns,
  data,
  totalNumberOfPages,
  page,
  FilterComponent,
  filterComponentProps,
  handlePaginationChange,
  children,
  placeholder,
  isLoading,
  errorMessage,
  showChecked = false,
  ifExport = false,
  ifFilter = true,
  exportFunction,
  removePaginationAndFiltering = false,
  handleSearch,
  value,
  readOnly
}) => {

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: userColumns,
        data,
      },
      useGlobalFilter,
      useExpanded,
      useRowSelect,
      (hooks) => {
        // Let's make a column for selection
        const checkBox = showChecked ? [
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          }
        ] : []
        hooks.visibleColumns.push((columns) => [
          ...checkBox,
          ...columns,
        ]);
      }
    );

  // Checkbox function
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  const renderItem = () => {
    if (isLoading) {
      // <div className="lds-roller">
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      // </div>;
    } else if (errorMessage) {
      return (
        <div className="w-full flex flex-column justify-center items-center h-52">
          <div className="font-bold not-italic text-xl">
            {errorMessage}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <tbody className="w-full" {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <Fragment key={i}>
                  <tr
                    key={row.id}
                    className="table-style"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell, i) => {
                      return (
                        <Fragment key={i}>
                          <td
                            key={row.id}
                            className="p-4"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        </Fragment>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </>
      );
    }
  };
  // overflow-x-auto we might need to put this back on the table
  return (
    <div className="w-full bg-white overflow-x-auto rounded-xl whitespace-nowrap">
      {children && <div className="w-full px-2 pb-6">{children}</div>}
      {
        handleSearch &&
        <div className="p-4 rounded">
          <SearchBar readOnly={readOnly} placeholder={placeholder} handleSearch={handleSearch} value={value} ifFilter={ifFilter} FilterComponent={FilterComponent} filterComponentProps={filterComponentProps} showExport={ifExport} />
        </div>
      }
      <table className="w-full border-spacing-y-4 border-separate" {...getTableProps()}>
        <thead className="w-full">
          {headerGroups.map((headerGroup, id) => (
            <tr key={id} className="table-style" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, id) => (
                <th
                  key={id}
                  className="p-4 text-left font-normal text-sm text-[#949494] text-base "
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {renderItem()}
      </table>
      {!removePaginationAndFiltering && data.length > 0 && !isLoading && (
        <div className="flex justify-end py-3 rounded-[10px]">
          <PaginationControlled
            handlePaginationChange={handlePaginationChange}
            totalNumberOfPages={totalNumberOfPages}
            page={page}
          />
        </div>
      )}
      {isLoading && (
        <div className="w-full overflow-hidden flex flex-column justify-center items-center  h-52">
          {/* <Spinner /> */} Loading....
        </div>
      )}
      {data.length < 1 && !isLoading && (
        <div className="w-full flex justify-center mt-4">
          <div className="text-RED-_100 font-bold not-italic text-lg">
            {errorMessage}
          </div>
        </div>
      )}

      {data.length < 1 && !isLoading && (
        <div className="flex flex-col items-center pb-10 bg-white">
          <img src={emptyIllustration} alt="empty" className="w-40 h-40" />
          <div className="text-NEUTRAL-_500 text-lg">
            No data available
          </div>
        </div>
      )}
    </div>
  );
};

export default Table2;
