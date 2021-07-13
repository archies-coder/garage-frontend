import {
    Box,
    Button,
    createStyles,
    Menu,
    MenuItem,
    MenuProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Theme,
    withStyles,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Skeleton } from '@material-ui/lab'
import { RootState } from 'app/store'
import TextInput from 'components/inputs/TextInput'
import { format } from 'date-fns'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditId, setMenuId } from './editableTableSlice'
import TablePaginationActions from './TablePaginationActions'
import CustomButton from '../inputs/Button'
import TableSkeletonBody from './TableSkeletonBody'
import EnhancedTableHead from './EnhancedTableHead'
import TableFooterWithPagination from './TableWrapperFooter'
import { useStyles } from './styles/EditableTStyles'
import { StyledPaginationBox } from './styles/StyledPaginationBox'

interface IRowProps {
    [id: string]: any
}

interface IMenuItemProps {
    path?: string | ((id: any) => any)
    title: string
    onClick?: () => any
    item: (id: any) => JSX.Element
}

interface ITableCellProps {
    padding?: number
}

export interface IColumnsConfig {
    id: any
    label: any
    sequence?: number
    isSort?: boolean
    isFilterable?: boolean
}

interface IConfigObject {
    columns: IColumnsConfig[]
    data: any[]
    menuOptions?: any[]
    cellOptions?: ITableCellProps
    isLoading?: boolean
    pagination?: boolean
    pageChange?: any
    totalCount?: number
    editHandler?: any
}

interface OwnProps extends React.HTMLAttributes<any> {
    config: IConfigObject
}

type Props = OwnProps

function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

type Order = 'asc' | 'desc'

function getComparator(
    order: Order,
    orderBy: string
): (a: any, b: any) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array: any[], comparator: (a: any, b: any) => number) {
    const stabilizedThis = array.map(
        (el, index) => [el, index] as [any, number]
    )
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const StyledMenu = withStyles({
    paper: {
        // border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            // backgroundColor: theme.palette.primary.main,
            // '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            //     color: theme.palette.primary.main,
            // },
        },
    },
}))(MenuItem)

const EditableTable: FunctionComponent<Props> = ({ config, ...props }) => {
    const classes = useStyles(config)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [order, setOrder] = React.useState<Order>('asc')
    const [orderBy, setOrderBy] = React.useState<string>('id')

    const [data, setData] = React.useState<any[]>([])

    const rows = [...config.data]
    const columns = [...config.columns]
    const menuOptions = config.menuOptions ? [...config.menuOptions] : null
    const pageChange = config.pageChange
    const totalCount = config.totalCount || rows.length
    const editHandler = config.editHandler

    const dispatch = useDispatch()

    const { menuId, editId } = useSelector(
        (state: RootState) => state.editableTable
    )

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string
    ) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        menuId: any
    ) => {
        setAnchorEl(event.currentTarget)
        dispatch(setMenuId(menuId))
    }

    const handleClose = () => {
        setAnchorEl(null)
        dispatch(setMenuId(null))
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
        // pageChange && pageChange(newPage, rowsPerPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
        // pageChange && pageChange(0, parseInt(event.target.value, 10))
    }

    const formatDate = (date: string) => {
        return date ? format(new Date(date), 'MMM dd, HH:mm a').toString() : ''
    }

    useEffect(() => {
        if (config.data && config.data.length > 0) {
            setData(config.data)
        }
    }, [config.data])

    const TableHeader = (
        <TableHead className={classes.header}>
            {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
            ))}
        </TableHead>
    )

    const SortableTableHeader = (
        <EnhancedTableHead
            columns={columns}
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
        />
    )
    const tableRows = pageChange
        ? rowsPerPage > 0
            ? stableSort(data, getComparator(order, orderBy))
            : data
        : rowsPerPage > 0
        ? stableSort(data, getComparator(order, orderBy)).slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
          )
        : data

    const printCell = (row: any, col: any) => {
        // debugger
        if (editId === row.id) {
            const dataIndex = config.data.findIndex((r) => r.id === row.id)
            return col.editable ? (
                <TextInput
                    style={{ marginTop: 10 }}
                    label={col.label}
                    name={col.id}
                    value={config.data[dataIndex][col.id] || ''}
                    onChange={(e: any) => {
                        editHandler(row.id, e)
                    }}
                />
            ) : (
                row[col.id]
            )
        }
        if (col.isDate && row[col.id] !== undefined) {
            return formatDate(row[col.id])
        }
        return row[col.id]
    }

    const body = (
        <TableBody>
            {tableRows.map((row: any, i: number) => (
                <TableRow key={row.id}>
                    {columns.map((col: any, j: number) => (
                        <TableCell key={col.id + '-' + row.id}>
                            {printCell(row, col)}
                        </TableCell>
                    ))}
                    {row.id === editId && !config.isLoading && (
                        <TableCell key={row.id + '-' + 'ok'}>
                            <CustomButton
                                style={{ height: 40, width: 20 }}
                                onClick={() => dispatch(setEditId(null))}
                            >
                                Ok
                            </CustomButton>
                        </TableCell>
                    )}
                    {menuOptions && (
                        <TableCell
                            key={i + '-c'}
                            className={classes.cell}
                            align="left"
                        >
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={(e) => {
                                    handleClick(e, i + '-c')
                                }}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <StyledMenu
                                id={'simple-menu-' + i + row['id']}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(menuId === i + '-c')}
                                onClose={handleClose}
                            >
                                {menuOptions
                                    .filter((item) => {
                                        return item.hideMenu
                                            ? !item.hideMenu(row)
                                            : true
                                    })
                                    .map(({ item, key, callback }, i) => {
                                        return (
                                            <StyledMenuItem
                                                key={i}
                                                id={row[key] || row.id}
                                                onClick={(e) => {
                                                    handleClose()
                                                    callback &&
                                                        callback(
                                                            row[key] || row.id
                                                        )
                                                }}
                                            >
                                                {item(row[key] || row.id)}
                                            </StyledMenuItem>
                                        )
                                    })}
                            </StyledMenu>
                        </TableCell>
                    )}
                </TableRow>
            ))}
        </TableBody>
    )

    const tableFooterProps = {
        columns,
        totalCount,
        rowsPerPage,
        page,
        handleChangePage,
        handleChangeRowsPerPage,
    }

    return (
        <TableContainer
            {...props}
            classes={{
                root: classes.root,
            }}
        >
            <Table>
                {SortableTableHeader}
                {config.isLoading && (
                    <TableSkeletonBody columns={columns} classes={classes} />
                )}
                {!config.isLoading && body}
            </Table>
            {config.pagination === undefined ? (
                <StyledPaginationBox justifyContent="end">
                    <TableFooterWithPagination {...tableFooterProps} />
                </StyledPaginationBox>
            ) : (
                <StyledPaginationBox justifyContent="end">
                    {config.pagination && (
                        <TableFooterWithPagination {...tableFooterProps} />
                    )}
                </StyledPaginationBox>
            )}
        </TableContainer>
    )
}

export default EditableTable
