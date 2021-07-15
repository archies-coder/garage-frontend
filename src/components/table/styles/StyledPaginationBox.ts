import { withStyles, Box } from '@material-ui/core'

export const StyledPaginationBox = withStyles((theme) => ({
    root: {
        '&': {
            // textAlign: '-moz-center',
            textAlign: '-webkit-center',
            margin: '20px auto',
            // fontSize: '16px'
        },
    },
}))(Box)
