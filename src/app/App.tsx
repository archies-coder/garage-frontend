import {
    Backdrop,
    CircularProgress,
    Container,
    createStyles,
    Grid,
    makeStyles,
    Snackbar,
    Theme,
} from '@material-ui/core'
import { cleanup } from '@testing-library/react'
import { apis } from 'api/Apis'
import NavGridContainer from 'layouts/navbar/NavGridContainer'
import SidebarView from 'layouts/sidebar/SidebarView'
import { setAuthUser } from 'pages/auth/AuthSlice'
import SignIn from 'pages/auth/SignIn'
import SignUp from 'pages/auth/SignUp'
import HomeView from 'pages/home/HomeView'
import VehicleForm from 'pages/vehicle/VehicleForm'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Routes from './Routes'
import { stopSnackbar } from './SnackbarSlice'
import { RootState } from './store'

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

    const dispatch = useDispatch()

    const { isLoggedIn } = useSelector((state: RootState) => state.auth)
    const { open, vertical, horizontal, message } = useSelector(
        (state: RootState) => state.snackbar
    )
    const { mask } = useSelector((state: RootState) => state.backdrop)

    if (!isLoggedIn) {
        // debugger
        //localStorage.loginRedirect = rest.location.pathname
        let user = sessionStorage.getItem('authUser')

        if (!user) user = localStorage.getItem('authUser')

        if (user) {
            JSON.parse(user)
            //outhUser(JSON.parse(user));
            dispatch(setAuthUser(JSON.parse(user)))
        } else {
            //return <Redirect to="/signin" />
        }
    }

    React.useEffect(() => {
        apis.get('/').then((res) => console.log(res))
    }, [])

    return (
        <Grid container className={classes.root}>
            <Backdrop className={classes.backdrop} open={mask}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                autoHideDuration={5000}
                onClose={() => dispatch(stopSnackbar())}
                message={message}
                key={vertical + horizontal}
            />
            <Container maxWidth={'xl'} className={classes.root}>
                <SidebarView />
                <NavGridContainer>
                    <Switch>
                        <Route exact path="/signin" component={SignIn} />
                        <Route exact path="/signup" component={SignUp} />
                        {!isLoggedIn && <Redirect to="/signin" />}
                        {Routes.map(({ path, component, exact }) => (
                            <Route
                                key={path}
                                exact={
                                    typeof exact !== 'undefined' ? exact : false
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
