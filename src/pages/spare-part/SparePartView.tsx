import { Box, createStyles, Grid, Paper, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { RootState } from 'app/store'
import { CustomMenuItem } from 'components/CustomMenuItem'
import CustomButton from 'components/inputs/Button'
import SearchInput from 'components/inputs/SearchInput'
import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableWrapper from '../../components/TableWrapper'
import { fetchSpareParts } from './SparePartSlice'

interface OwnProps {}

type Props = OwnProps

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            // marginRight: 30,
            paddingRight: 150,
        },
    })
)

const data = {
    name: 'Pesh Infotech Ph1',
    address: '984 Sporer Highway',
    checkPoints: 'Gate 1',
}

//const columns = ['SparePart name', 'Address', 'CheckPoints']
const columns = [
    {
        id: 'name',
        label: 'SparePart Name',
    },
    {
        id: 'brand',
        label: 'Brand',
    },
    {
        id: 'category',
        label: 'Category',
    },
    {
        id: 'cost',
        label: 'Cost',
    },
    {
        id: 'quantity',
        label: 'Quantity',
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

const SparePartView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const { spareParts, pageCount, pageLinks, isLoading, error } = useSelector(
        (state: RootState) => state.spareParts
    )

    const TableConfig = {
        columns: columns,
        isLoading: isLoading,
        data: spareParts,
        pagination: true,
        pageChange: (page: number, count: number) => {
            dispatch(fetchSpareParts(page, count))
        },
        totalCount: pageCount,
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
    }

    useEffect(() => {
        dispatch(fetchSpareParts(0, 10))
    }, [dispatch])

    return (
        <Grid item xs={12} style={{ marginRight: '30px' }}>
            <Paper className={classes.paper}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{ paddingTop: '38px', paddingBottom: '26px' }}
                >
                    <SearchInput
                        hidden
                        placeholder="Search SparePart by name"
                        width={354}
                        style={{ paddingLeft: '30px' }}
                    />
                    <div style={{ width: 353 }} />
                    {/* <SelectInput value="Action" menuOptions={selectInputMenu} style={{ width: '122px' }} /> */}
                    <CustomMenuItem to="/spare-parts/add">
                        <CustomButton
                            style={{
                                width: '122px',
                                fontSize: '12px',
                                height: '39px',
                                padding: 0,
                            }}
                        >
                            Add SparePart
                        </CustomButton>
                    </CustomMenuItem>
                </Box>

                <TableWrapper
                    config={TableConfig}
                    style={{ width: '870px', paddingLeft: '60px' }}
                />
            </Paper>
        </Grid>
    )
}

export default SparePartView
