import { TableBody, TableRow, TableCell } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Button from 'components/inputs/Button'
import React from 'react'

export default function TableSkeletonBody({ columns, classes }: any) {
    return (
        <TableBody>
            {Array(20)
                .fill(0)
                .map((row: any, i: number) => (
                    <TableRow key={i}>
                        {columns.map((col: any) => (
                            <TableCell key={row.id || i}>
                                <Skeleton variant="text" />
                            </TableCell>
                        ))}
                        <TableCell className={classes.cell} align="left">
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                            >
                                {/* <MoreHorizIcon /> */}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    )
}
