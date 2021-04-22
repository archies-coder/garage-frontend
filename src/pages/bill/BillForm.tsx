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
import CustomButton from 'components/inputs/Button'
import TextInput from 'components/inputs/TextInput'
import * as React from 'react'
import theme from 'theme'

export interface IBillFormProps {}

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
    })
)

const inputStyle = {
    width: 446,
    marginLeft: '64px',
}

export default function BillForm(props: IBillFormProps) {
    const classes = useStyles()
    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
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
                                name={'number'}
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
                    <Grid container>
                        <Grid item xs={6}>
                            <TextInput
                                label={'Item'}
                                name={'itemname'}
                                style={inputStyle}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                label={'Cost'}
                                name={'itemcost'}
                                style={inputStyle}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                label={'Item'}
                                name={'itemname'}
                                style={inputStyle}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                label={'Cost'}
                                name={'itemcost'}
                                style={inputStyle}
                            />
                        </Grid>
                        <Grid
                            container
                            style={{
                                backgroundColor: theme.palette.grey[400],
                                height: 1,
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        />
                        <Grid justify="flex-end" container>
                            Net Total <br />
                            850.00
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </Grid>
    )
}
