import { Grid, Paper } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'
import { RootState } from 'app/store'
import { fetchAllVehicles, fetchVehicleEntries } from 'pages/home/HomeSlice'
import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import TableWrapper from '../../components/table/TableWrapper'
import { fetchBills } from './BillSlice'
import useBillViewStyles from './styles/billViewStyles'
import { TableConfig } from './table/billViewTableConfig'

interface OwnProps extends RouteComponentProps<any> {}

type Props = OwnProps

const BillView: FunctionComponent<Props> = (props) => {
    const classes = useBillViewStyles()

    const dispatch = useDispatch()

    const { bills, pageCount, pageLinks, isLoading, error } = useSelector(
        (state: RootState) => state.bills
    )

    const { VehicleEntriesById, VehiclesById } = useSelector(
        (state: RootState) => state.VehicleEntries
    )

    const getData = () => {
        return bills.map((b) => ({
            ...b,
            vehicleEntryId: VehicleEntriesById[b.vehicleEntryId].vehicleNo,
        }))
    }

    const pageChange = (page: number, count: number) => {
        dispatch(fetchBills(page, count))
    }

    const tableConfig = TableConfig({
        isLoading,
        getData,
        pageChange,
        pageCount,
    })

    useEffect(() => {
        dispatch(fetchAllVehicles())
        dispatch(fetchVehicleEntries())
        dispatch(fetchBills(0, 10))
    }, [dispatch])

    return (
        <Grid item xs={12} style={{ marginRight: '30px' }}>
            <Paper className={classes.paper}>
                {/* <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{ paddingTop: '38px', paddingBottom: '26px' }}
                >
                    <SearchInput
                        hidden
                        placeholder="Search Bill by name"
                        width={354}
                        style={{ paddingLeft: '30px' }}
                    />
                    <div style={{ width: 353 }} />
                    {/* <SelectInput value="Action" menuOptions={selectInputMenu} style={{ width: '122px' }} />
                    <CustomMenuItem to="/bills/add">
                        <CustomButton
                            style={{
                                width: '122px',
                                fontSize: '12px',
                                height: '39px',
                                padding: 0,
                            }}
                        >
                            Add Bill
                        </CustomButton>
                    </CustomMenuItem>
                </Box> */}
                <div className={classes.header}>
                    <ArrowBackIos
                        className={classes.arrowBack}
                        onClick={() => props.history.push('/')}
                    />
                    <span> Bills </span>
                </div>
                <TableWrapper
                    config={tableConfig}
                    style={{ width: '870px', paddingLeft: '60px' }}
                />
            </Paper>
        </Grid>
    )
}

export default BillView
