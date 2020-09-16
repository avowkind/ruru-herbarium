import React from 'react'
import Link from 'next/link'
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce } from 'react-table'
import matchSorter from 'match-sorter'

// Define a default UI for filtering
function GlobalFilter ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <input
      type='search'
      placeholder='search'
      className='pl-1 max-w-md'
      value={value || ''}
      onChange={e => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
    />
  )
}

function fuzzyTextFilterFn (rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const columnsNoSp = [
  { Header: '#', accessor: 'plantCount' },
  { Header: 'Var', accessor: 'variety' },
  { Header: 'Purchased', accessor: 'purchaseDate' },
  { Header: 'From', accessor: 'purchasedFrom' },
  { Header: 'Where planted', accessor: 'location' }
]
const columnsSp = [
  { Header: 'Species', accessor: 'species' },
  ...columnsNoSp
]
const PlantTable = ({ plants, omitspecies }) => {
  const columns = omitspecies ? columnsNoSp : columnsSp
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      }
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data: plants,
      defaultColumn: 'purchaseDate', // Be sure to pass the defaultColumn option
      filterTypes
    },
    // useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy
  )

  return (
    <div className='panel'>
      <h2>Plants </h2>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table
        {...getTableProps()}
        className='table-auto'
      >
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr
              key={i}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, i) => (
                <th
                  key={i}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ⬆️'
                        : ' ⬇️'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <Link key={row.original._id} href={`/plants/${row.original._id}`}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        key={i}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              </Link>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default PlantTable
