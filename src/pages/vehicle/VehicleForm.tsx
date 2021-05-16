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
import { getBackdropStop } from 'app/BackdropSlice'
import { startSnackbar } from 'app/SnackbarSlice'
import { RootState } from 'app/store'
import CustomButton from 'components/inputs/Button'
import DateTimeInput from 'components/inputs/DateTimeInput'
import SelectInput from 'components/inputs/SelectInput'
import TextInput from 'components/inputs/TextInput'
import {
    defaultVehicle,
    enableSaveButton,
    fetchAllVehicles,
    postVehicleEntry,
    setCurrentVehicleEntry,
} from 'pages/home/HomeSlice'
import { config as VehicleFormConfig } from 'pages/vehicle/VehicleFormConfig'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { useVehicleFormStyles } from './VehicleFormStyles'

export interface IVehicleFormProps extends RouteComponentProps<any> {}

export default function VehicleForm(props: IVehicleFormProps) {
    const classes = useVehicleFormStyles()

    const [vehiclepicloca, setVehiclepicloca] = React.useState<string>('')
    const [readOnly, setReadOnly] = React.useState<boolean>(false)
    const [selectedFile, setSlectedFile] = React.useState<File>()

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchAllVehicles())
    }, [dispatch])

    const {
        currentVehicleEntry,
        VehiclesByVehicleNo,
        VehicleEntriesById,
        saveButtonActive,
    } = useSelector((state: RootState) => state.VehicleEntries)

    const { vehicleNo, vehicleImagePath } = currentVehicleEntry

    async function srcToFile(
        src: string,
        fileName: string,
        mimeType = 'image/gif'
    ) {
        const res = await fetch(src)
        const buf = await res.arrayBuffer()
        return new File([buf], fileName, { type: mimeType })
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        // const files = document.getElementById('vehiclepic').files
        const files = event.currentTarget.files
        if (files?.length) {
            setSlectedFile(files[0])
            setVehiclepicloca(URL.createObjectURL(files[0]))
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const {
            vehicleNo,
            vehicleMake,
            vehicleModel,
            vehicleType,
            customerName,
            customerMobile,
            customerAddress: address,
            purpose,
            intime,
            remark,
        } = currentVehicleEntry

        const vehiclepicfile =
            selectedFile ||
            (vehicleImagePath &&
                (await srcToFile(vehicleImagePath, 'vehiclepic').then(
                    (file) => file
                ))) ||
            ''

        const bodyFormData = new FormData()

        bodyFormData.append('vehicleImage', vehiclepicfile)
        bodyFormData.append('vehicleNo', vehicleNo)
        bodyFormData.append('vehicleModel', vehicleModel)
        bodyFormData.append('vehicleMake', vehicleMake)
        bodyFormData.append('vehicleType', vehicleType)
        bodyFormData.append('customerName', customerName)
        bodyFormData.append('purpose', purpose)
        bodyFormData.append('remark', remark)
        bodyFormData.append('intime', new Date(intime).toISOString())
        bodyFormData.append('customerMobile', customerMobile)
        bodyFormData.append('customerAddress', address)

        dispatch(postVehicleEntry(bodyFormData, () => props.history.push('/')))
    }

    const handleVehivcleNoAutoComplete = (obj: any) => {
        if (Object.keys(VehiclesByVehicleNo).includes(obj.vehicleNo)) {
            const ExistingVehicle = VehiclesByVehicleNo[obj.vehicleNo]
            const { vehicleMake, vehicleModel, vehicleType } = ExistingVehicle
            dispatch(
                setCurrentVehicleEntry({
                    ...currentVehicleEntry,
                    ...obj,
                    vehicleMake: vehicleMake,
                    vehicleModel: vehicleModel,
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

    const id = props.match.params.vehicleEntryId

    const fetchVehicleEntriesById = (id: any) => {
        return VehicleEntriesById[id]
    }

    React.useEffect(() => {
        id != -1 &&
            dispatch(
                setCurrentVehicleEntry(
                    fetchVehicleEntriesById(id) || defaultVehicle
                )
            )
    }, [id])

    React.useEffect(() => {
        if (id == -1 || !id) {
            //showSaveButton = true
            dispatch(enableSaveButton())
        }
    }, [])

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
                        disabled={readOnly}
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
                        disabled: readOnly,
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
                                // readOnly: readOnly,
                            }
                        }
                        disabled={readOnly}
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
                                            disabled={readOnly}
                                            accept="image/*"
                                            className={classes.UploadInput}
                                            onChange={handleFileChange}
                                            id="vehiclepic"
                                            type="file"
                                            name="vehiclepic"
                                        />
                                        <label htmlFor="vehiclepic">
                                            {vehicleImagePath ||
                                            vehiclepicloca ? (
                                                <img
                                                    onLoad={() => {
                                                        vehiclepicloca &&
                                                            URL.revokeObjectURL(
                                                                vehiclepicloca
                                                            )
                                                        // if (vehicleImagePath) {
                                                        //     //@ts-ignore
                                                        //     const x = [
                                                        //         ...//@ts-ignore
                                                        //         document.getElementById(
                                                        //             'vehiclepic'
                                                        //         ).files,
                                                        //     ]
                                                        //     //@ts-ignore
                                                        //     x[0] = srcToFile(
                                                        //         vehicleImagePath,
                                                        //         'vehiclepic',
                                                        //         'image/gif'
                                                        //     )
                                                        // }
                                                    }}
                                                    id="vehiclepicimg"
                                                    height={85}
                                                    width={85}
                                                    src={
                                                        vehiclepicloca
                                                            ? vehiclepicloca
                                                            : vehicleImagePath
                                                    }
                                                />
                                            ) : (
                                                <CameraAlt
                                                    alignmentBaseline={
                                                        'central'
                                                    }
                                                    color={'disabled'}
                                                    fontSize={'large'}
                                                />
                                            )}
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
                                    {saveButtonActive && (
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
                                    )}
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
