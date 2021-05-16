import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useVehicleFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 20,
            height: '100%',
        },
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
            color: theme.palette.text.primary,
        },
        arrowBack: {
            height: '16px',
            // verticalAlign: 'bottom',
            cursor: 'pointer',
        },
        imageContainer: {
            padding: theme.spacing(3, 0, 0, 8),
        },
        imageUpload: {
            position: 'relative',
            backgroundColor: '#fff',
            height: 86,
            width: 86,
            textAlign: 'center',
            borderRadius: theme.shape.borderRadius,

            '&  svg': {
                height: '100%',
                opacity: 0.7,
                fontSize: '44px',
                cursor: 'pointer',
            },
        },
        VehicleInfo: {
            padding: theme.spacing(2, 0, 1, 8),
        },
        owner: {
            padding: theme.spacing(1, 0, 2, 8),
        },
        rightInputs: {
            marginTop: 117,
        },
        button: {
            // marginRight: 20
        },
        selectInput: {
            '& > .makeStyles-inputContainer-32': {
                // padding: 0
            },
        },
        UploadInput: {
            display: 'none',
        },
    })
)
