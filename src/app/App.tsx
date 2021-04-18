import {
    Container,
    createStyles,
    Grid,
    makeStyles,
    Theme,
} from '@material-ui/core'
import NavGridContainer from 'layouts/navbar/NavGridContainer'
import SidebarView from 'layouts/sidebar/SidebarView'
import HomeView from 'pages/home/HomeView'
import VehicleForm from 'pages/vehicle/VehicleForm'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Routes from './Routes'

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexGrow: 1,
            padding: 0,
            height: 'inherit',
            overflow: 'hidden',
        },
        backdrop: {
            zIndex: 10000,
            color: theme.palette.primary.main,
        },
        fullHeightContainer: {
            // height: '100%',
            // overflow: 'auto'
        },
        paper: {
            height: '100%',
            padding: theme.spacing(0),
            textAlign: 'center',
            backgroundColor: '#192949',
            overflowY: 'hidden',
        },
        fullHeight: {
            // height: '100vh',
        },
    })
)

export default function App(props: Props) {
    const classes = useStyles()
    return (
        <Grid container className={classes.root}>
            <Container maxWidth={'xl'} className={classes.root}>
                <SidebarView />
                <NavGridContainer>
                    <Switch>
                        {Routes.map(({ path, component, exact }) => (
                            <Route
                                key={path}
                                exact={
                                    typeof exact !== 'undefined' ? exact : true
                                }
                                path={path}
                                component={component}
                            />
                        ))}
                    </Switch>
                </NavGridContainer>
            </Container>
        </Grid>
    )
}
