import classes from '*.module.css'
import {
    Box,
    Container,
    createStyles,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Theme,
} from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'
import { RootState } from 'app/store'
import CustomButton from 'components/inputs/Button'
import TextInput from 'components/inputs/TextInput'
import { IVehicleEntry } from 'models/vehicleEntry.model'
import { fetchVehicleEntries } from 'pages/home/HomeSlice'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import theme from 'theme'
import { addNewBillItem, addNewSparePart, setCurrentBill } from './BillSlice'

export interface IBillFormProps extends RouteComponentProps<any> {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 20,
            paddingTop: 20,
            paddingBottom: 20,
            height: '100%',
        },
        button: {},
        header: {
            fontSize: '20px',
            fontWeight: 'bold',
            padding: theme.spacing(2, 0, 0, 4),
            color: theme.palette.text.primary,
        },
        headerSecondary: {
            fontSize: '18.75px',
            fontWeight: 'bold',
            padding: theme.spacing(0, 0, 2, 0),
            marginBottom: 16,
            color: theme.palette.text.primary,
        },
        arrowBack: {
            height: '16px',
            // verticalAlign: 'bottom',
            cursor: 'pointer',
        },
    })
)

const inputStyle = {
    width: 446,
    marginLeft: '64px',
}

export default function BillForm(props: IBillFormProps) {
    const classes = useStyles()
    const [vehicleEntry, setVehicleEntry] = React.useState<IVehicleEntry>({})

    const dispatch = useDispatch()

    const { VehicleEntriesById } = useSelector(
        (state: RootState) => state.VehicleEntries
    )
    const { currentBill, currentBillSpareParts } = useSelector(
        (state: RootState) => state.bills
    )

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

    React.useEffect(() => {
        dispatch(fetchVehicleEntries())
    }, [dispatch])

    React.useEffect(() => {
        if (vehicleEntryId) {
            console.log(vehicleEntry)
            setVehicleEntry(VehicleEntriesById[vehicleEntryId])
            console.log(vehicleEntry)
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
                                // value={}
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

                <Container>
                    <span className={classes.headerSecondary}>
                        Bill Information
                    </span>
                    <Box>
                        {Object.keys(currentBill).map((i) => {
                            const index = parseInt(i)
                            return (
                                <Grid
                                    container
                                    key={i}
                                    style={{ marginTop: 16 }}
                                >
                                    <Grid item xs={6}>
                                        <TextInput
                                            label={'Item'}
                                            name={`item-${i}`}
                                            style={inputStyle}
                                            value={currentBill[index].item}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextInput
                                            label={'Cost'}
                                            type="number"
                                            name={`cost-${i}`}
                                            style={inputStyle}
                                            value={currentBill[index].cost}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            )
                        })}
                        {/* <Grid item xs={6}></Grid> */}
                        <Grid item xs={6}>
                            <Box className={classes.button}>
                                {/* {saveButtonActive &&  */}
                                <CustomButton
                                    type="button"
                                    style={{
                                        height: '38px',
                                        width: '168px',
                                        marginTop: '1px',
                                        // marginLeft: 200,
                                    }}
                                    onClick={() => dispatch(addNewBillItem())}
                                >
                                    Add
                                </CustomButton>
                                {/*  } */}
                            </Box>
                        </Grid>
                    </Box>

                    <Grid
                        container
                        style={{
                            backgroundColor: theme.palette.grey[400],
                            height: 1,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    />

                    {/* Spare Parts */}
                    <Box style={{ marginTop: 22 }}>
                        <span className={classes.headerSecondary}>
                            Spare Parts Information
                        </span>
                        {Object.keys(currentBillSpareParts).map((i) => {
                            const index = parseInt(i)
                            return (
                                <Grid
                                    container
                                    key={i}
                                    style={{ marginTop: 16 }}
                                >
                                    <Grid item xs={4}>
                                        <TextInput
                                            label={'Name'}
                                            name={`name-${i}`}
                                            // style={inputStyle}
                                            value={
                                                currentBillSpareParts[index]
                                                    .name
                                            }
                                            onChange={handleSparePartsChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextInput
                                            label={'Brand'}
                                            name={`brand-${i}`}
                                            // style={inputStyle}
                                            value={
                                                currentBillSpareParts[index]
                                                    .brand
                                            }
                                            onChange={handleSparePartsChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextInput
                                            label={'Quantity'}
                                            type="number"
                                            name={`quantity-${i}`}
                                            // style={inputStyle}
                                            value={
                                                currentBillSpareParts[index]
                                                    .quantity
                                            }
                                            onChange={handleSparePartsChange}
                                        />
                                    </Grid>
                                </Grid>
                            )
                        })}
                        {/* <Grid item xs={6}></Grid> */}
                        <Grid item xs={6}>
                            <Box className={classes.button}>
                                {/* {saveButtonActive &&  */}
                                <CustomButton
                                    type="button"
                                    style={{
                                        height: '38px',
                                        width: '168px',
                                        marginTop: '1px',
                                        // marginLeft: 200,
                                    }}
                                    onClick={() => dispatch(addNewSparePart())}
                                >
                                    Add
                                </CustomButton>
                                {/*  } */}
                            </Box>
                        </Grid>
                    </Box>
                </Container>
            </Paper>
        </Grid>
    )
}
