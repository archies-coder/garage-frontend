import classes from '*.module.css'
import {
    Box,
    createStyles,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Theme,
} from '@material-ui/core'
import TextInput from 'components/inputs/TextInput'
import * as React from 'react'

export interface IBillViewProps {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 20,
            height: '100%',
        },
    })
)

const inputStyle = {
    width: 446,
    marginLeft: '64px',
}

export default function BillView(props: IBillViewProps) {
    const classes = useStyles()
    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Box>
                    <TextInput
                        style={{
                            ...inputStyle,
                            marginTop: 32,
                            marginBottom: 32,
                        }}
                        label={'vehicle number'}
                        name={'number'}
                    />
                </Box>
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
                    <Box>Net Total</Box>
                </Grid>
            </Paper>
        </Grid>
    )
}
