import {
    Box,
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Theme,
    Typography,
} from '@material-ui/core'
import { ArrowBackIos, CameraAlt } from '@material-ui/icons'
import { RootState } from 'app/store'
import CustomButton from 'components/inputs/Button'
import DateTimeInput from 'components/inputs/DateTimeInput'
import SelectInput from 'components/inputs/SelectInput'
import TextInput from 'components/inputs/TextInput'
import {
    fetchAllVehicles,
    postVehicleEntry,
    setCurrentVehicleEntry,
} from 'pages/home/HomeSlice'
import { config as VehicleFormConfig } from 'pages/vehicle/VehicleFormConfig'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'

export interface IVehicleFormProps extends RouteComponentProps<any> {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 20,
            height: '100%',
        },
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
            color: theme.palette.text.primary,
        },
        arrowBack: {
            height: '16px',
            // verticalAlign: 'bottom',
            cursor: 'pointer',
        },
        imageContainer: {
            padding: theme.spacing(3, 0, 0, 8),
        },
        imageUpload: {
            position: 'relative',
            backgroundColor: '#fff',
            height: 86,
            width: 86,
            textAlign: 'center',
            borderRadius: theme.shape.borderRadius,

            '&  svg': {
                height: '100%',
                opacity: 0.7,
                fontSize: '44px',
                cursor: 'pointer',
            },
        },
        VehicleInfo: {
            padding: theme.spacing(2, 0, 1, 8),
        },
        owner: {
            padding: theme.spacing(1, 0, 2, 8),
        },
        rightInputs: {
            marginTop: 117,
        },
        button: {
            // marginRight: 20
        },
        selectInput: {
            '& > .makeStyles-inputContainer-32': {
                // padding: 0
            },
        },
        UploadInput: {
            display: 'none',
        },
    })
)

export default function VehicleForm(props: IVehicleFormProps) {
    const classes = useStyles()

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchAllVehicles())
    }, [dispatch])

    const { currentVehicleEntry, VehiclesByVehicleNo } = useSelector(
        (state: RootState) => state.VehicleEntries
    )

    const { vehicleNo } = currentVehicleEntry

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log(currentVehicleEntry)
        const {
            vehicleNo,
            make,
            model,
            vehicleType,
            name,
            mobile,
            city: address,
            purpose,
            intime,
            remark,
        } = currentVehicleEntry
        const data = {
            vehicleNo,
            model,
            make,
            vehicleType,
            name,
            mobile,
            address,
            purpose,
            intime,
            remark,
        }
        dispatch(postVehicleEntry(data))
    }

    const handleVehivcleNoAutoComplete = (obj: any) => {
        if (Object.keys(VehiclesByVehicleNo).includes(obj.vehicleNo)) {
            const ExistingVehicle = VehiclesByVehicleNo[obj.vehicleNo]
            const { vehicleMake, vehicleModel, vehicleType } = ExistingVehicle
            dispatch(
                setCurrentVehicleEntry({
                    ...currentVehicleEntry,
                    ...obj,
                    make: vehicleMake,
                    model: vehicleModel,
                    vehicleType: vehicleType,
                })
            )
        } else {
            dispatch(
                setCurrentVehicleEntry({
                    ...currentVehicleEntry,
                    ...obj,
                })
            )
        }
    }

    const handleChange = (e: any) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(
            setCurrentVehicleEntry({
                ...currentVehicleEntry,
                [e.target.name]: e.target.value,
            })
        )
        // if (name === "mobile") {
        //     dispatch(doAutoPopulateVehicle('', value))
        // }
        // if (name === "email") {
        //     dispatch(doAutoPopulateVehicle(value, ''))
        // }
    }

    const VehicleEntriesectionFields = VehicleFormConfig.filter(
        (i) => i.section === 'VI'
        // &&
        // VehicleConfigsById[i.id] &&
        // VehicleConfigsById[i.id].value
    )
        .sort((a, b) => a.seq - b.seq)
        .map((o, i) => (
            <Grid
                item
                xs={6}
                // style={{ marginLeft: '52px' }}
                key={o.id}
            >
                {/* {(o.render && o.render(notificationById[i], handleChange, i + "-" + o.key)) || obj[o.key]} */}
                {/* <TextInput style={{ width: 446, marginLeft: '64px' }} label={o.name} name={o.id} onChange={handleChange}
                //@ts-ignore
                value={currentVehicleEntry[o.id]} /> */}
                {o.component ? (
                    o.component({
                        // purpose: {
                        //     options: purposeOptions,
                        //     onChange: handleAutoComplete,
                        //     value: purpose,
                        // },
                        vehicles: {
                            options: Object.keys(VehiclesByVehicleNo),
                            onChange: handleVehivcleNoAutoComplete,
                            value: vehicleNo,
                        },

                        style: {
                            width: 446,
                            marginLeft: i % 2 === 0 ? '64px' : '28px',
                        },
                        // disabled: setReadOnly(0),
                    })
                ) : (
                    <TextInput
                        style={
                            i % 2 === 0
                                ? { width: 446, marginLeft: '64px' }
                                : { width: 446, marginLeft: '28px' }
                        }
                        label={o.name}
                        name={o.id}
                        onChange={handleChange}
                        required={o.required}
                        //@ts-ignore
                        value={currentVehicleEntry[o.id]}
                        InputProps={
                            {
                                // readOnly: setReadOnly(o),
                            }
                        }
                        // disabled={setReadOnly(o)}
                    />
                )}
            </Grid>
        ))

    const ownerSectionFields = VehicleFormConfig.filter(
        (i) => i.section === 'OI'
        // &&
        // VehicleConfigsById[i.id] &&
        // VehicleConfigsById[i.id].value
    )
        .sort((a, b) => a.seq - b.seq)
        .map((o, i) => (
            <Grid
                item
                xs={6}
                // style={{ marginLeft: '52px' }}
                key={o.id}
            >
                {/* {(o.render && o.render(notificationById[i], handleChange, i + "-" + o.key)) || obj[o.key]} */}
                {/* <TextInput style={{ width: 446, marginLeft: '64px' }} label={o.name} name={o.id} onChange={handleChange}
                //@ts-ignore
                value={currentVehicleEntry[o.id]} /> */}
                {o.component ? (
                    o.component({
                        // purpose: {
                        //     options: purposeOptions,
                        //     onChange: handleAutoComplete,
                        //     value: purpose,
                        // },

                        style: {
                            width: 446,
                            marginLeft: i % 2 === 0 ? '64px' : '28px',
                        },
                        // disabled: setReadOnly(0),
                    })
                ) : (
                    <TextInput
                        style={
                            i % 2 === 0
                                ? { width: 446, marginLeft: '64px' }
                                : { width: 446, marginLeft: '28px' }
                        }
                        label={o.name}
                        name={o.id}
                        onChange={handleChange}
                        required={o.required}
                        //@ts-ignore
                        value={currentVehicleEntry[o.id]}
                        InputProps={
                            {
                                // readOnly: setReadOnly(o),
                            }
                        }
                        // disabled={setReadOnly(o)}
                    />
                )}
            </Grid>
        ))

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.header}>
                        <ArrowBackIos
                            className={classes.arrowBack}
                            onClick={() => props.history.push('/')}
                        />
                        <span> Vehicle's Details</span>
                    </div>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box display="flex">
                                <Box
                                    p={1}
                                    flexGrow={1}
                                    className={classes.imageContainer}
                                >
                                    <div className={classes.imageUpload}>
                                        <input
                                            // disabled={setReadOnly(0)}
                                            accept="image/*"
                                            className={classes.UploadInput}
                                            // onChange={handleFileChange}
                                            id="profilepic"
                                            type="file"
                                            name="profilepic"
                                        />
                                        <label htmlFor="profilepic">
                                            {/* {profilePicPath || profilepicloca ? */}
                                            {/* <img
                                                    onLoad={() => {
                                                        // profilepicloca && URL.revokeObjectURL(profilepicloca);
                                                        //@ts-ignore
                                                        // profilePicPath && (document.getElementById('profilepic').files[0] = srcToFile(profilePicPath, 'profilepic', 'image/gif'))
                                                    }}
                                                    id="profilepicimg" height={85} width={85}
                                                    // src={profilepicloca ? profilepicloca : `http://localhost:8000/${profilePicPath}`}
                                                    />
                                                : */}
                                            <CameraAlt
                                                alignmentBaseline={'central'}
                                                color={'disabled'}
                                                fontSize={'large'}
                                            />
                                            {/* } */}
                                        </label>
                                    </div>
                                    <Typography
                                        style={{
                                            marginTop: 10,
                                            fontSize: 14,
                                        }}
                                    >
                                        Vehicle's Picture
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                style={{
                                    position: 'relative',
                                    top: '32px',
                                    right: '86px',
                                }}
                            >
                                <SelectInput
                                    hidden
                                    value="Actions"
                                    width={147}
                                    style={{ height: '45px' }}
                                    // menuOptions={selectInputMenu}
                                />
                                <Box className={classes.button}>
                                    {/* {saveButtonActive &&  */}
                                    <CustomButton
                                        type="submit"
                                        style={{
                                            height: '38px',
                                            width: '168px',
                                            marginTop: '1px',
                                        }}
                                    >
                                        Save
                                    </CustomButton>
                                    {/*  } */}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    {/* Form */}
                    <Grid container style={{ width: '1010px' }}>
                        <Grid item xs={6}>
                            <div className={classes.VehicleInfo}>
                                <span className={classes.headerSecondary}>
                                    Vehicle information
                                </span>
                                <Grid container style={{ marginTop: '16px' }}>
                                    <Grid item xs={6}>
                                        {/* @ts-ignore */}
                                        <DateTimeInput
                                            label="Time In"
                                            name="intime"
                                            value={new Date().toString()}
                                            format="dd-MM-yyyy hh:mm a"
                                            mask="__-__-____ __:__ _"
                                            margin="normal"
                                            id="date-picker-inline"
                                            autoOk
                                            onError={console.log}
                                            // onChange={(date) => {
                                            //     debugger
                                            //     dispatch(setCurrentVehicleEntry({
                                            //         ...currentVehicleEntry,
                                            //         intime: new Date(date).toString()
                                            //     }))
                                            // }}
                                            // onChange={handleChange}
                                            // InputProps={{
                                            //     readOnly: setReadOnly({}),
                                            // }}
                                            // disabled={setReadOnly({})}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        {/* @ts-ignore */}
                                        <DateTimeInput
                                            label="Time Out"
                                            type="text"
                                            name="outime"
                                            value={new Date().toString()}
                                            format="dd-MM-yyyy hh:mm a"
                                            mask="__-__-____ __:__ _"
                                            margin="normal"
                                            id="date-picker-inline"
                                            placeholder="Filled when checked out"
                                            autoOk
                                            onError={console.log}
                                            // onChange={(date) => {
                                            //     debugger
                                            //     dispatch(setCurrentVehicleEntry({
                                            //         ...currentVehicleEntry,
                                            //         outime: new Date(date).toString()
                                            //     }))
                                            // }}
                                            InputProps={
                                                {
                                                    // readOnly: setReadOnly({}),
                                                }
                                            }
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        {VehicleEntriesectionFields}
                    </Grid>
                    <Grid container style={{ width: '1020px' }}>
                        <Grid item xs={6}>
                            <div className={classes.owner}>
                                <span className={classes.headerSecondary}>
                                    Owner Information
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        {ownerSectionFields}
                    </Grid>
                </form>
            </Paper>
        </Grid>
    )
}
