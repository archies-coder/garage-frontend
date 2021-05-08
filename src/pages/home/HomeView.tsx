import classes from '*.module.css'
import {
    Box,
    createStyles,
    fade,
    Grid,
    makeStyles,
    Paper,
    Theme,
} from '@material-ui/core'
import { RootState } from 'app/store'
import MyChart2 from 'components/Chart'
import { CustomMenuItem } from 'components/CustomMenuItem'
import SearchInput from 'components/inputs/SearchInput'
import CustomizedSwitch from 'components/Switch'
import TableWrapper from 'components/TableWrapper'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeDateDropdown from './HomeDateDropdown'
import { disableSaveButton, fetchVehicleEntries } from './HomeSlice'
import HomeStats from './HomeStats'
import { fetchHomeStats } from './HomeStatsSlice'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 0,
            height: '100%',
        },
        graph: {
            //backgroundColor: 'blue',
            height: '100%',
            padding: 20,
        },
        cell: {
            borderBottom: 'none',
        },
        header: {
            '& > *': {
                fontWeight: '600 !important',
            },
        },
        inputContainer: {
            padding: 20,
        },
        search: {
            position: 'relative',
            display: 'inline-block',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.5),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.75),
            },
            width: '300px',
        },
        select: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.5),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.75),
            },
            width: '200px',
            padding: '12px',
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: '#000',
            // padding: 4
        },
        inputInput: {
            padding: theme.spacing(2, 2, 2, 2),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
        },
        label: {
            textTransform: 'capitalize',
        },
        buttonRoot: {
            backgroundColor: 'white',
            boxShadow: 'none',
            borderRadius: theme.shape.borderRadius - 5,
        },
    })
)

const columns = [
    // {
    //     id: "profilePicPath",
    //     label: '',
    // },
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

interface Props {}

const homeStatsConfig = {
    delivered: 15,
    in_garage: 4,
    parts_used: 27,
    total_customers: 19,
    VehicleEntriestats: 20,
    isLoadingHomeStats: false,
}

const HomeView: React.FC<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    React.useEffect(() => {
        // dispatch(fetchVisitors(0, 10))
        dispatch(fetchVehicleEntries())
        dispatch(fetchHomeStats())
    }, [dispatch])

    const {
        VehicleEntries: vehicleEntries,
        isLoading: isLoadingVehicleEntries,
        pageCount,
        pageLinks,
    } = useSelector((state: RootState) => state.VehicleEntries)

    const { vehicleEntriestats } = useSelector(
        (state: RootState) => state.homeStats
    )

    const handleCheckOut = () => {
        console.log('Check out')
    }

    const TableConfig = {
        columns: columns,
        isLoading: isLoadingVehicleEntries,
        data: vehicleEntries.map((el) => {
            console.log(el)
            return {
                ...el,
                //@ts-ignore
                //hideMenu: !!el.checkOutBy,
                //@ts-ignore
                // checked_out: !!el.checkOutBy,
                // profilePicPath: <Avatar src={`http://localhost:8000/${el.profilePicPath}`} />
            }
        }),
        pagination: true,
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
        totalCount: pageCount,
        menuOptions: [
            {
                key: '_id',
                hideMenu: (row: any) => {
                    return row.checked_out
                },
                callback: handleCheckOut,
                item: (id: any) => {
                    return <CustomMenuItem to="/">{'Check Out'}</CustomMenuItem>
                },
            },
            {
                key: '_id',
                item: (id: any) => (
                    <CustomMenuItem
                        to={'/vehicle/' + id}
                        onClick={() => dispatch(disableSaveButton())}
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
                        onClick={() => dispatch(disableSaveButton())}
                    >
                        Bill
                    </CustomMenuItem>
                ),
            },
        ],
    }

    return (
        <Grid item>
            <Grid container>
                <Grid item xs={12} style={{ height: '20%', marginTop: 0 }}>
                    <Paper className={classes.paper} elevation={0}>
                        <Grid container>
                            <Grid item md={8}>
                                <Box>
                                    <Box alignItems="flex-start">
                                        <HomeDateDropdown />
                                    </Box>
                                    <Box alignItems="flex-end">
                                        <HomeStats config={homeStatsConfig} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={4}>
                                <div className={classes.graph}>
                                    <MyChart2
                                        VehicleEntriestats={vehicleEntriestats}
                                    ></MyChart2>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper} elevation={0}>
                        {/* Table */}
                        <Grid
                            item
                            xs
                            style={{
                                height: '100%',
                                marginTop: 22,
                                paddingRight: 22,
                            }}
                        >
                            <Paper className={classes.paper} elevation={0}>
                                <Box display="flex" justifyContent="start">
                                    <SearchInput
                                        style={{
                                            marginTop: '33px',
                                            marginLeft: '27px',
                                        }}
                                        //  onChange={(e: any) => { debugger; handleFilterChange({ vehicle: e.target.value }) }}
                                        // value={filter.vehicle}
                                        placeholder="Search vehicle"
                                    />
                                    {/* <SelectInput style={{marginTop: '33px', marginLeft: '27px'}} value="In Office" /> */}
                                    {/*@ts-ignore*/}
                                    {/* <CustomizedSwitch
                                        style={{
                                            marginTop: '33px',
                                            marginLeft: '27px',
                                            height: '36px',
                                        }}
                                        label={'In Office'}
                                        // checked={inOffice} onChange={() => { setInOffice(!inOffice) }}
                                    /> */}
                                    {/* <Button onClick={() => { setFilter({ site: "", purpose: "", vehicle: "" }); dispatch(fetchInOfficeVisitors()) }}
                                classes={{
                                    root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                                    label: classes.label, // class name, e.g. `classes-nesting-label-x`
                                }}
                                variant="contained" style={{ marginTop: '33px', marginLeft: '27px', height: '40px' }}>In Office
                            </Button> */}

                                    {/* <SelectInput style={{ marginTop: '33px', marginLeft: '27px' }} onChange={(e: any) => { debugger; handleFilterChange({ purpose: e.target.value }) }} menuOptions={purpose.map(item => ({ title: item }))} defaultValue="All Purpose" value={filter.purpose} />
                            <SelectInput style={{ marginTop: '33px', marginLeft: '27px' }} onChange={(e: any) => { debugger; handleFilterChange({ site: e.target.value }) }} menuOptions={sites.map(item => ({ title: item.sitename }))} defaultValue="All Sites" value={filter.site} />
                            <Button onClick={() => { setInOffice(false); handleFilterChange({ site: "", purpose: "", vehicle: "" }) }}
                                classes={{
                                    root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                                    label: classes.label, // class name, e.g. `classes-nesting-label-x`
                                }} variant="contained" style={{ marginTop: '33px', marginLeft: '27px', height: '40px' }}
                            >Clear Filter</Button> */}
                                </Box>
                                <TableWrapper
                                    style={{
                                        marginTop: '17px',
                                        marginLeft: '32px',
                                        marginRight: '30px',
                                    }}
                                    config={TableConfig}
                                />
                            </Paper>
                        </Grid>
                        {/* </Grid> */}
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HomeView
