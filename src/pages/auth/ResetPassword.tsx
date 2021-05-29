import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { RootState } from 'app/store'
import logo from 'assets/logo/logosmall.png'
import CustomButton from 'components/inputs/Button'
import TextInput from 'components/inputs/TextInput'
import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { resetPasswordInput, setCurrentPasswordInput } from './AuthSlice'

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

export default function ResetPassword(props: Props) {
    const classes = useStyles()

    const dispatch = useDispatch()

    const { currentPasswordInput } = useSelector(
        (state: RootState) => state.auth
    )

    const { newpass, confnewpass } = currentPasswordInput

    const handleChange = (e: any) =>
        dispatch(
            setCurrentPasswordInput({
                ...currentPasswordInput,
                [e.target.name]: e.target.value,
            })
        )

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        // dispatch(doLogin(
        //   username,
        //   password,
        //   () => dispatch(resetPasswordInput())
        // ))
        props.history.push('/')
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img src={logo} alt="Auro" />
                <Typography component="h1" variant="h5">
                    Reset Password
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
                        id="newpass"
                        label="New Password"
                        name="newpass"
                        autoComplete="newpass"
                        autoFocus
                        onChange={handleChange}
                        value={newpass}
                    />
                    <TextInput
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confnewpass"
                        label="Confirm New Password"
                        type="confnewpass"
                        id="confnewpass"
                        autoComplete="confnewpass"
                        onChange={handleChange}
                        value={confnewpass}
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
                </form>
            </div>
        </Container>
    )
}
