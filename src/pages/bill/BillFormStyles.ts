import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useBillFormStyles = makeStyles((theme: Theme) =>
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
        header: {
            fontSize: '20px',
            fontWeight: 'bold',
            padding: theme.spacing(2, 0, 0, 4),
            color: theme.palette.text.primary,
        },
        headerSecondary: {
            fontSize: '18.75px',
            fontWeight: 'bold',
            padding: theme.spacing(0, 0, 2, 0),
            marginBottom: 16,
            color: theme.palette.text.primary,
        },
        arrowBack: {
            height: '16px',
            // verticalAlign: 'bottom',
            cursor: 'pointer',
        },
    })
)
