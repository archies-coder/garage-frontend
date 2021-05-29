import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { RootState } from 'app/store'
// import logo from 'assets/logo/logosmall.png';
import CustomButton from 'components/inputs/Button'
import TextInput from 'components/inputs/TextInput'
import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import {
    doLogin,
    handleForgotPassword,
    resetForgotPasswordInput,
    setCurrentForgotPasswordInput,
} from './AuthSlice'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

interface Props extends RouteComponentProps<any> {}

export default function ForgotPassword(props: Props) {
    const classes = useStyles()

    const dispatch = useDispatch()

    const { currentForgotPasswordInput } = useSelector(
        (state: RootState) => state.auth
    )

    const { username } = currentForgotPasswordInput

    const handleChange = (e: any) =>
        dispatch(
            setCurrentForgotPasswordInput({
                ...currentForgotPasswordInput,
                [e.target.name]: e.target.value,
            })
        )

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(
            handleForgotPassword(username, () =>
                dispatch(resetForgotPasswordInput())
            )
        )
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* <img src={logo} alt="Auro" /> */}
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <TextInput
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleChange}
                        value={username}
                    />
                    <CustomButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Reset
                    </CustomButton>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/signin">Sign In</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
