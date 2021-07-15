import {
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
} from '@material-ui/core'
import { IColumnsConfig } from './EditableTable'
import { useStyles } from './styles/EditableTStyles'
import React from 'react'

type Order = 'asc' | 'desc'

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>
    columns: IColumnsConfig[]
    numSelected?: number
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
    onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void
    order: Order
    orderBy: string
    rowCount: number
    isActive?: boolean
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
    const {
        columns,
        isActive,
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props
    const createSortHandler = (property: string) => (
        event: React.MouseEvent<unknown>
    ) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead className={classes.header}>
            <TableRow>
                {columns.map((headCell: any) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.isSort && (
                            <TableSortLabel
                                // IconComponent={KeyboardArrowDownIcon}
                                active={orderBy === headCell.id}
                                direction={
                                    orderBy === headCell.id ? order : 'asc'
                                }
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        )}
                        {!headCell.isSort && headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
