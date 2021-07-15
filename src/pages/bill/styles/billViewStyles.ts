import { makeStyles, Theme, createStyles } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            // marginRight: 30,
            paddingRight: 150,
        },
        header: {
            fontSize: '20px',
            fontWeight: 'bold',
            padding: theme.spacing(2, 0, 0, 4),
            color: theme.palette.text.primary,
        },
        arrowBack: {
            height: '16px',
            // verticalAlign: 'bottom',
            cursor: 'pointer',
        },
    })
)
