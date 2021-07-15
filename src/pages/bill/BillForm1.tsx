import {Box, Grid, Paper,} from '@material-ui/core'
import {ArrowBackIos} from '@material-ui/icons'
import {RootState} from 'app/store'
import CustomButton from 'components/inputs/Button'
import TextInput from 'components/inputs/TextInput'
import {ISingleVehicleEntry} from 'models/vehicleEntry.model'
import {fetchVehicleEntries} from 'pages/home/HomeSlice'
import * as React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {useBillFormStyles} from './BillFormStyles'
import {defaultBill, setCurrentBill, setCurrentVehicleEntry,} from './BillSlice'
import EditableTable from "../../components/table/EditableTable";
import TableConfig from "./BillTableConfig";
import {setEditId} from 'components/table/editableTableSlice'

export interface IBillFormProps extends RouteComponentProps<any> {}

const inputStyle = {
    width: 446,
    marginLeft: '64px',
}

export default function BillForm1(props: IBillFormProps) {
    const classes = useBillFormStyles()
    const [vehicleEntry, setVehicleEntry] = React.useState<
        ISingleVehicleEntry | Record<string, never>
    >({})

    const dispatch = useDispatch()

    const { VehicleEntriesById } = useSelector(
        (state: RootState) => state.VehicleEntries
    )
    const {
        currentBill,
        currentBillSpareParts,
        currentVehicleEntry,
    } = useSelector((state: RootState) => state.bills)

    const handleInputChange = (event: any) => {
        const name: string = event.target.name.split('-')[0]
        const id = parseInt(event.target.name.split('-')[1])
        const value = event.target.value
        dispatch(
            setCurrentBill({
                ...currentBill,
                [id]: {
                    ...currentBill[id],
                    [name]: value,
                },
            })
        )
    }
    const handleSparePartsChange = (event: any) => {
        const name: string = event.target.name.split('-')[0]
        const id = parseInt(event.target.name.split('-')[1])
        const value = event.target.value
        dispatch(
            setCurrentBill({
                ...currentBill,
                [id]: {
                    ...currentBill[id],
                    [name]: value,
                },
            })
        )
    }

    const { vehicleEntryId } = props.match.params

    const getData = () => {
        const temp = Object.entries(currentBill)
        const data = temp.map(el => {
            return {
                item: el[1].item,
                cost: el[1].cost,
                id: el[0]
            }
        })
        return data
    }

    const tableConfig = TableConfig({
        isLoading: false,
        data: getData(),
        editHandler: (id: any, event: any) => {
            console.log(currentBill[id], {
                ...currentBill,
                [id]: {
                    ...currentBill[id],
                    [event.target.name]: event.target.value,
                },
            })
            dispatch(
                setCurrentBill({
                    ...currentBill,
                    [id]: {
                        ...currentBill[id],
                        [event.target.name]: event.target.value,
                    },
                })
            )
        },
        dispatchSetEditId: (id: string) => {
            dispatch(setEditId(id))
        }
    })

    React.useEffect(() => {
        dispatch(fetchVehicleEntries())
    }, [dispatch])

    React.useEffect(() => {
        dispatch(setCurrentVehicleEntry(VehicleEntriesById[vehicleEntryId]))
        if (vehicleEntryId) {
            setVehicleEntry(VehicleEntriesById[vehicleEntryId])
        }
    }, [VehicleEntriesById])

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <div className={classes.header}>
                    <ArrowBackIos
                        className={classes.arrowBack}
                        onClick={() => props.history.push('/bills')}
                    />
                    <span> Bill </span>
                </div>
                <Grid
                    container
                    // justify="space-between"
                    style={{ marginTop: 32, marginBottom: 32 }}
                >
                    <Grid item xs={6}>
                        <Box>
                            <TextInput
                                style={inputStyle}
                                label={'vehicle number'}
                                name="vehicleNo"
                                value={
                                    currentVehicleEntry
                                        ? currentVehicleEntry.vehicleNo
                                        : ''
                                }
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} justify="flex-end">
                        <Box className={classes.button}>
                            {/* {saveButtonActive &&  */}
                            <CustomButton
                                type="submit"
                                style={{
                                    height: '38px',
                                    width: '168px',
                                    marginTop: '1px',
                                    marginLeft: 200,
                                }}
                            >
                                Save
                            </CustomButton>
                            {/*  } */}
                        </Box>
                    </Grid>
                </Grid>

                <EditableTable config={tableConfig} />
                <Grid container>
                    <Grid item>
                        {/*<TextInput*/}
                        {/*    style={{ marginTop: 10 }}*/}
                        {/*    label="Item"*/}
                        {/*    name="item"*/}
                        {/*    onChange={(e: any) => {*/}
                        {/*        // const temp = [...data]*/}
                        {/*        // debugger*/}
                        {/*        // const temp = data.map((d, i) => {*/}
                        {/*        //     if (i === dataIndex) {*/}
                        {/*        //         return Object.assign({}, d, {*/}
                        {/*        //             [e.target.name]: e.target.value,*/}
                        {/*        //         })*/}
                        {/*        //     }*/}
                        {/*        //     return d*/}
                        {/*        // })*/}
                        {/*        // setData(temp)*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <CustomButton onClick={() => {
                            dispatch(setEditId(Object.keys(currentBill).length.toString()))
                            dispatch(setCurrentBill({
                                ...currentBill,
                                [Object.keys(currentBill).length]: defaultBill
                            }))
                        }}>
                            Add
                        </CustomButton>
                    </Grid>
                    <Grid item></Grid>
                    <Grid item></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}