import { Box, createStyles, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { ArrowBackIos } from '@material-ui/icons'
// import { saveSparePart, setCurrentSparePart } from './sparePartSlice';
import { RootState } from 'app/store'
import CustomButton from 'components/inputs/Button'
import { CustomAutoComplete } from 'components/inputs/CustomAutoComplete'
import TextInput from 'components/inputs/TextInput'
import { ISparePart } from 'models/sparePart.model'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import {
    defaultInputState,
    fetchSpareParts,
    saveSparePart,
    setCurrentSparePart,
    SparePartInputState,
} from './SparePartSlice'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 30,
            height: '100%',
            width: '100%',
            // marginTop
        },
        header: {
            fontSize: '22px',
            fontWeight: 'bold',
            padding: theme.spacing(2, 0, 0, 4),
            color: theme.palette.text.primary,
        },
        headerSecondary: {
            fontSize: '20px',
            fontWeight: 'bold',
            padding: theme.spacing(0, 0, 4, 0),
            color: theme.palette.text.primary,
        },
        arrowBack: {
            height: '30px',
            verticalAlign: 'bottom',
            cursor: 'pointer',
        },
        rightInputs: {
            marginTop: 134,
        },
        button: {
            marginRight: 20,
        },
        inputGrid: {
            marginTop: '30px',
            padding: theme.spacing(1, 0, 0, 2),
        },
    })
)

interface OwnProps extends RouteComponentProps<any> {}

type Props = OwnProps

interface IFilter {
    name: string
    category: string
    brand: string
}

const defaultFilter: IFilter = {
    name: '',
    category: '',
    brand: '',
}

const SparePartForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const [filterdSpareParts, setFilterdSpareParts] = useState<ISparePart[]>([])
    const [filter, setFilter] = useState<IFilter>(defaultFilter)

    const [brandOptions, setBrandOptions] = useState<string[]>([])
    const [categoryOptions, setCategoryOptions] = useState<string[]>([])

    const dispatch = useDispatch()

    const { spareParts, currentSparePart, sparePartsById, error } = useSelector(
        (state: RootState) => state.spareParts
    )

    const { name, category, brand, quantity } = currentSparePart
    const inputState = currentSparePart

    const setInputState = (sparePart: SparePartInputState) => {
        dispatch(setCurrentSparePart(sparePart))
    }

    const handleAutoComplete = (obj: Record<string, string>) => {
        setFilter({
            ...filter,
            ...obj,
        })
        setInputState({
            ...inputState,
            ...obj,
        })
        // const sparePartsWithSameName = spareParts.filter(
        //     (p) => p.name === obj.name
        // )
        // debugger
        // if (sparePartsWithSameName.length > 0) {
        //     debugger
        //     setInputState({
        //         ...inputState,
        //         name: obj.name,
        //     })
        //     setBrandOptions(sparePartsWithSameName.map((p) => p.brand))
        //     setCategoryOptions(sparePartsWithSameName.map((p) => p.category))
        // } else {
        //     setInputState({
        //         ...inputState,
        //         name: obj.name,
        //     })
        // }
    }

    const handleChange = (e: any) =>
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value,
        })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(
            saveSparePart(
                {
                    name: name,
                    category: category,
                    brand: brand,
                    quantity: quantity,
                },
                () => setInputState(defaultInputState)
            )
        )
    }

    const id = props.match.params.sparePartId
    // debugger;
    useEffect(() => {
        // if (sparePartsById[id]) {
        //     const tempId = sparePartsById[id]
        //     //setInputState(tempId)
        //     dispatch(setCurrentSparePart(tempId));
        // }
    }, [id])

    useEffect(() => {
        dispatch(fetchSpareParts())
    }, [dispatch])

    useEffect(() => {
        setFilterdSpareParts(spareParts)
    }, [spareParts])

    useEffect(() => {
        const { name, brand, category } = filter
        let filtered = spareParts
        if (name !== '' && spareParts.map((p) => p.name).includes(name)) {
            filtered = filtered.filter((p) => p.name === name)
        }
        if (brand !== '' && spareParts.map((p) => p.brand).includes(brand)) {
            filtered = filtered.filter((p) => p.brand === brand)
        }
        if (
            category !== '' &&
            spareParts.map((p) => p.category).includes(category)
        ) {
            filtered = filtered.filter((p) => p.category === category)
        }
        if (filtered.length === 1) {
            setInputState({
                ...inputState,
                name: filtered[0].name,
                brand: filtered[0].brand,
                category: filtered[0].category,
            })
        }
        setFilterdSpareParts(filtered)
    }, [filter])

    return (
        <Grid item xs={12} style={{ marginRight: 30 }}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.header}>
                        <ArrowBackIos
                            className={classes.arrowBack}
                            onClick={() => props.history.push('/spare-parts')}
                        />
                        <span> SparePart details</span>
                    </div>
                    <Box display="flex" justifyContent="flex-end">
                        <Box className={classes.button}>
                            <CustomButton
                                style={{
                                    height: '45px',
                                    width: '168px',
                                    marginTop: '1px',
                                    padding: 0,
                                }}
                                type="submit"
                            >
                                Save
                            </CustomButton>
                        </Box>
                    </Box>
                    <Grid className={classes.inputGrid} container>
                        <Grid item xs={6}>
                            {/*<div>*/}
                            <CustomAutoComplete
                                // style={style}
                                required
                                options={filterdSpareParts.map((a) => a.name)}
                                label="Spare Part Name"
                                name="name"
                                onChange={(value: string) =>
                                    handleAutoComplete({
                                        name: value,
                                    })
                                }
                                value={name}
                            />
                            {/* <TextInput
                                label="Name"
                                required
                                name="name"
                                onChange={handleChange}
                                value={name}
                            /> */}
                            <CustomAutoComplete
                                // style={style}
                                required
                                options={filterdSpareParts.map(
                                    (a) => a.category
                                )}
                                label="Spare Part Category"
                                name="category"
                                onChange={(value: string) =>
                                    handleAutoComplete({
                                        category: value,
                                    })
                                }
                                value={category}
                            />

                            {/* <TextInput
                                required
                                label="Brand"
                                onChange={handleChange}
                                name="brand"
                                value={brand}
                            /> */}
                        </Grid>
                        <Grid item xs={6}>
                            <CustomAutoComplete
                                // style={style}
                                required
                                options={filterdSpareParts.map((a) => a.brand)}
                                label="Spare Part Brand"
                                name="brand"
                                onChange={(value: string) =>
                                    handleAutoComplete({
                                        brand: value,
                                    })
                                }
                                value={brand}
                            />
                            <TextInput
                                type="number"
                                required
                                label="Quantity"
                                onChange={handleChange}
                                name="quantity"
                                value={quantity}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    )
}

export default SparePartForm
