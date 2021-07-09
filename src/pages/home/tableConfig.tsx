import { Avatar } from '@material-ui/core'
import { CustomMenuItem } from 'components/CustomMenuItem'
import React from 'react'

const columns = [
    {
        id: 'vehicleImagePath',
        label: '',
    },
    // {
    //     id: '_id',
    //     label: 'Check-in Id',
    // },
    {
        id: 'vehicleModel',
        label: 'Vehicle Model',
    },
    {
        id: 'vehicleNo',
        label: 'Vehicle Number',
    },
    {
        id: 'customerName',
        label: 'Name',
    },
    {
        id: 'customerMobile',
        label: 'Mobile No',
    },
    {
        id: 'purpose',
        label: 'Purpose',
    },
    {
        id: 'intime',
        label: 'In Time',
        isSort: true,
        isDate: true,
    },
    {
        id: 'outime',
        label: 'Out Time',
        isSort: true,
        isDate: true,
    },
]

export const TableConfig = ({
    isLoading,
    vehicleEntries,
    totalCount,
    handleCheckOut,
    dispatchDisableSaveButton,
}: any) => ({
    totalCount,
    isLoading,
    pagination: true,
    columns: columns,
    data: vehicleEntries.map(
        (el: { vehicleImagePath: string | undefined; _id: string }) => ({
            ...el,
            id: el._id,
            //@ts-ignore
            //hideMenu: !!el.checkOutBy,
            //@ts-ignore
            // checked_out: !!el.checkOutBy,
            vehicleImagePath: <Avatar src={el.vehicleImagePath} />,
        })
    ),
    pageChange: (page: number, count: number) => {
        // const {
        //     purpose: purpose1,
        //     site: site1,
        //     vehicle: vehicle1
        // } = filter
        // // setRowPerPage(count)
        // //dispatch(fetchVisitors(page, count, vehicle1, purpose1, site1))
        // doFetch(page, count, vehicle1, purpose1, site1)
    },
    menuOptions: [
        {
            key: '_id',
            hideMenu: (row: any) => {
                return row.checked_out
            },
            // callback: handleCheckOut,
            item: (id: string) => {
                return (
                    <CustomMenuItem onClick={() => handleCheckOut(id)} to="/">
                        Check Out
                    </CustomMenuItem>
                )
            },
        },
        {
            key: '_id',
            item: (id: any) => (
                <CustomMenuItem
                    to={'/vehicle/' + id}
                    // onClick={() => dispatch(disableSaveButton())}
                    onClick={dispatchDisableSaveButton}
                >
                    View Details
                </CustomMenuItem>
            ),
        },
        {
            key: '_id',
            item: (id: any) => (
                <CustomMenuItem
                    to={'/bills/add/' + id}
                    // onClick={() => dispatch(disableSaveButton())}
                    onClick={dispatchDisableSaveButton}
                >
                    Bill
                </CustomMenuItem>
            ),
        },
    ],
})
