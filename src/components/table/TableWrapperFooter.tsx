import { TableRow, TablePagination, TableFooter } from '@material-ui/core'
import React from 'react'
import { IColumnsConfig } from './EditableTable'
import TablePaginationActions from './TablePaginationActions'

interface TableFooterProps {
    columns: IColumnsConfig[]
    totalCount: number
    rowsPerPage: number
    page: number
    handleChangePage: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => void
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
}

export default function TableFooterWithPagination({
    columns,
    totalCount,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
}: TableFooterProps) {
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 },
                    ]}
                    colSpan={columns.length}
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    )
}
