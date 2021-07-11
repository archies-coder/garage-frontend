//const columns = ['Bill name', 'Address', 'CheckPoints']
const columns = [
    {
        id: 'name',
        label: 'Bill Name',
    },
    {
        id: 'cost',
        label: 'Cost',
    },
    {
        id: 'vehicleEntryId',
        label: 'Vehicle Number',
    },
    {
        id: 'createdAt',
        label: 'Created On',
        isDate: true,
    },
    {
        id: 'updatedAt',
        label: 'Updated on',
        isDate: true,
    },
]

const selectInputMenu = [
    {
        title: 'Add',
    },
    {
        title: 'Delete',
    },
    {
        title: 'Disable',
    },
]

export const TableConfig = ({
    isLoading,
    getData,
    pageChange,
    totalCount,
}: any = {}) => ({
    columns: columns,
    isLoading: isLoading,
    data: getData(),
    pagination: true,
    pageChange,
    totalCount,
    // menuOptions: [{
    //     item: (id: any) => <CustomMenuItem to='/' onClick={() => console.log('check out ' + id)}>
    //         Delete
    //     </CustomMenuItem>
    // },
    // {
    //     item: (id: any) => <CustomMenuItem to='/' onClick={() => console.log('check out ' + id)}>
    //         Disable
    //     </CustomMenuItem>
    // },
    // {
    //     item: (id: any) => <CustomMenuItem to='/' onClick={() => console.log('check out ' + id)}>
    //         View Details
    //     </CustomMenuItem>
    // }]
})
