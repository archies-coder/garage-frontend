import {
    Box,
    Collapse,
    Container,
    createStyles,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
    Typography,
    withStyles,
} from '@material-ui/core'
import { ExpandLess, ExpandMore, HomeSharp } from '@material-ui/icons'
import ReceiptIcon from '@material-ui/icons/Receipt'
import BuildIcon from '@material-ui/icons/Build'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {}

const drawerWidth = 295

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: 0,
            // backgroundColor: theme.palette.primary.main,
            // height: 'inherit',
            // overflow: 'hidden'
        },
        paper: {
            height: '100%',
            width: drawerWidth,
            flexShrink: 0,
            // padding: theme.spacing(0),
            textAlign: 'center',
            color: '#A6ACB8',
            backgroundColor: theme.palette.text.primary,
            // width: '295px',

            '& .MuiSvgIcon-root': {
                color: '#158594',
            },

            '& .listItem': {
                backgroundColor: theme.palette.text.primary,
                color: '#A6ACB8',
                letterSpacing: '0.5px',
            },

            '& .active-navlink': {
                backgroundImage: 'linear-gradient(to right, #2C578A, #20849C)',
                color: theme.palette.common.white,

                '& .MuiSvgIcon-root': {
                    color: theme.palette.common.white,
                },
            },

            '& .active-navlink-menuItem': {
                color: theme.palette.common.white,
            },
        },
        list: {
            paddingLeft: '23px',
        },
        logo: {
            // height: '112px',
            // paddingTop: '30px',
            display: 'inline-block',
            fontSize: '21.64px',
            fontWeight: 'bold',
            marginLeft: '10px',
            verticalAlign: 'super',
            // fontFamily: 'Poppins, sans-serif',
            '& img': {},
        },
        nested: {
            paddingLeft: theme.spacing(10),
        },
        listItemText: {
            '& > *': {
                fontWeight: 600,
            },
        },

        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    })
)

const StyledListItem = withStyles((theme: Theme) => ({
    root: {
        marginBottom: '7px',
        paddingLeft: '38px',
    },
}))(ListItem)

type Child = {
    title: string
    path?: string
    icon?: JSX.Element
}

type MappableRoutesDictionary = {
    [key: string]: {
        path: string
        icon: JSX.Element
        children?: Child[]
        name: string
    }
}

const mappableRoutes: MappableRoutesDictionary = {
    Home: {
        path: '/',
        icon: <HomeSharp className="white-text" />,
        name: 'Home',
    },
    Bills: {
        path: '/bills',
        icon: <ReceiptIcon className="white-text" />,
        name: 'Bills',
    },
    SpareParts: {
        path: '/spare-parts',
        icon: <BuildIcon className="white-text" />,
        name: 'Spare Parts',
    },
}

const SidebarView: React.FC<Props> = () => {
    const classes = useStyles()
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.paper,
            }}
            anchor="left"
        >
            <Divider />
            <Box
                style={{
                    height: '112px',
                    paddingTop: '26px',
                    textAlign: 'start',
                    paddingLeft: '38px',
                }}
            >
                {/* <img src={logo} style={{ height: '45px', width: '45px' }} /> */}
                <Typography variant="h5" className={classes.logo} noWrap>
                    Shitlai Auto Garage
                </Typography>
            </Box>
            {/* List */}
            <List>
                {Object.keys(mappableRoutes).map((key, index) =>
                    mappableRoutes[key].children ? (
                        <>
                            {
                                // @ts-ignore
                                open[mappableRoutes[key].name] ? (
                                    <StyledListItem
                                        button
                                        // onClick={
                                        // () =>
                                        // handleClick(
                                        //     mappableRoutes[key].name
                                        // )
                                        // }
                                        className="listItem active-navlink"
                                    >
                                        <ListItemIcon className="white-text">
                                            {mappableRoutes[key].icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            className={classes.listItemText}
                                            primary={key}
                                        />
                                        {/*@ts-ignore*/}
                                        {open[mappableRoutes[key].name] ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </StyledListItem>
                                ) : (
                                    <StyledListItem
                                        button
                                        // onClick={
                                        // () =>
                                        // handleClick(
                                        //     mappableRoutes[key].name
                                        // )
                                        // }
                                        className="listItem"
                                    >
                                        <ListItemIcon className="white-text">
                                            {mappableRoutes[key].icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            className={classes.listItemText}
                                            primary={key}
                                        />
                                        {/*@ts-ignore*/}
                                        {open[mappableRoutes[key].name] ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </StyledListItem>
                                )
                            }
                            {/*@ts-ignore*/}
                            <Collapse
                                // in={open[mappableRoutes[key]?.name]}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    {mappableRoutes[key]?.children?.map(
                                        (child) => (
                                            <ListItem
                                                key={child.title}
                                                component={NavLink}
                                                exact
                                                activeClassName={
                                                    'active-navlink-menuItem'
                                                }
                                                to={
                                                    child.path ? child.path : ''
                                                }
                                                button
                                                className={classes.nested}
                                            >
                                                <ListItemText
                                                    className={
                                                        classes.listItemText
                                                    }
                                                    primary={child.title}
                                                />
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            </Collapse>
                        </>
                    ) : (
                        <ListItem
                            style={{ marginBottom: '7px', paddingLeft: '38px' }}
                            button
                            key={key}
                            component={NavLink}
                            exact
                            className="listItem"
                            activeClassName={'active-navlink'}
                            to={mappableRoutes[key].path}
                        >
                            <ListItemIcon className="white-text">
                                {mappableRoutes[key].icon}
                            </ListItemIcon>
                            <ListItemText
                                className={classes.listItemText}
                                primary={key}
                            />
                        </ListItem>
                    )
                )}
            </List>
        </Drawer>
    )
}

export default SidebarView
