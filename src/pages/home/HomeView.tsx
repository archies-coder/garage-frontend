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
import MyChart2 from 'components/Chart'
import * as React from 'react'
import HomeDateDropdown from './HomeDateDropdown'
import HomeStats from './HomeStats'

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

interface Props {}

const homeStatsConfig = {
    delivered: 0,
    in_garage: 0,
    parts_used: 0,
    total_customers: 0,
    visitorStats: 0,
    isLoadingHomeStats: 0,
}

const HomeView: React.FC<Props> = (props) => {
    const classes = useStyles()
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
                                        visitorStats={[0, 15, 45, 5, 10]}
                                    ></MyChart2>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HomeView
