import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // padding: 30
            //  .MuiTableCell-head
            '& .MuiTableCell-root': {
                fontSize: '12px',
                padding: '5px',
                height: '45px',
                borderBottom: 'none',
            },
            '& .MuiAvatar-root, & .MuiAvatar-circle, & .MuiAvatar-colorDefault': {
                height: '30px',
                width: '30px',
            },
            '& .MuiTable-root thead th': {
                fontWeight: 'bold',
            },
        },
        header: {
            '& > *': {
                fontWeight: 600,
            },
        },
        cell: {
            borderBottom: 'none',
            //padding: (config: IConfigObject) => config.cellOptions ? config.cellOptions.padding : 'auto'
        },
        pagination: {
            // fontSize: '25px'
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    })
)
