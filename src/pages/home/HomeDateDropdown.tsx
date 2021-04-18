import React, { FunctionComponent } from 'react'
import { Box, createStyles, Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import EventIcon from '@material-ui/icons/Event'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ExpandMore } from '@material-ui/icons'

interface OwnProps extends React.HTMLAttributes<any> {}

type Props = OwnProps

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            // display: 'inline-block',
            // marginTop: '15px',
            cursor: 'pointer',

            // margin: '15px 0 0 15px',
            '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                borderBottom: 'none !important',
            },
            '& #date-picker-inline2': {
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: '20px',
                letterSpacing: '0.5px',
                cursor: 'pointer !important',
                // width: '400px',
            },
        },
        icon: {
            '& > *': {
                fontSize: '30px',
                color: '#192949',
                paddingTop: '20px',
                paddingRight: '10px',
            },
        },
        date: {
            fontSize: '20px',
            fontWeight: 600,
            color: '#192949',
            letterSpacing: '0.5px',
            marginTop: '-25px',
            verticalAlign: 'super',
        },
        expandIcon: {
            '& > *': {
                fontSize: '45px',
                top: '-13px',
                marginLeft: '-130px',
                zIndex: '1',
                verticalAlign: '-webkit-baseline-middle',
                position: 'relative',
                // top: '116px',
                color: theme.palette.text.primary,
                cursor: 'pointer',
            },
        },
    })
)

const HomeDateDropdown: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date()
    )
    const [isOpen, setIsOpen] = React.useState(false)

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date)
    }
    return (
        <Box className={classes.container} {...props}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <span className={classes.icon}>
                    <EventIcon onClick={() => setIsOpen(true)} />
                </span>
                <DatePicker
                    style={{ maxWidth: '135px' }}
                    disableToolbar={false}
                    //allowKeyboardControl = {false}
                    //size= "small"
                    disableFuture
                    // disabled
                    variant="inline"
                    format="MMM dd, yyyy"
                    margin="normal"
                    id="date-picker-inline2"
                    autoOk
                    value={selectedDate}
                    onChange={handleDateChange}
                    // keyboardIcon={<ExpandMore></ExpandMore>}
                    open={isOpen}
                    onOpen={() => setIsOpen(true)}
                    onClose={() => setIsOpen(false)}
                />
                <ExpandMore
                    className={classes.expandIcon}
                    onClick={() => setIsOpen(true)}
                />
            </MuiPickersUtilsProvider>
        </Box>
    )
}

export default HomeDateDropdown
