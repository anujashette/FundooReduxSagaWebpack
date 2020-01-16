import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Keep from '../Assets/keep.png';
import list from '../Assets/list.svg';
import grid from '../Assets/grid.svg';
import Refresh from '@material-ui/icons/Refresh';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme, MuiThemeProvider, Button } from '@material-ui/core';
import '../styles/appBar.scss';
import Popover from '@material-ui/core/Popover';
import auth from './auth';
import DrawerLeft from './DrawerLeft';
const { useRef } = React;

const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            elevation4: {
                boxShadow: '0px 0px 0px -0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)'
            }
        },
        MuiPopover: {
            paper: {
                'max-width': 'calc(100% - 150px)',
                'min-width': '250px',
                'max-height': 'calc(100 % - 230px)',
                'min-height': '230px',
            }
        },
        MuiAppBar: {
            positionStatic: {
                position: 'fixed'
            }
        }
    }
})
const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    search: {
        position: 'relative',
        borderRadius: '10px',
        backgroundColor: '#edeff1',
        '&:hover': {
            boxShadow: '0px 0px 5px 0px #888888'
        },
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(10),
        width: '57%',
        maxWidth: '700px',
        height: '48px',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b6b6b'
    },
    inputRoot: {
        color: 'black',
    },
    inputInput: {
        padding: theme.spacing(1.6, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },

    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4)
    },
    profileAvatar: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    name: {
        padding: '20px 0 0 0'
    },
    email: {
        color: '#6d6d6d',
        fontSize: '1em',
        fontFamily: 'serif'
    },
    signout_button: {
        textTransform: 'initial',
        border: '1px solid #dadada',
        padding: '5px 21px',
        borderRadius: '4px',
        margin: '20px 0 -20px 0'
    }
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const drawerRef = useRef();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleSignout = () => {
        handleMenuClose();
        // // console.log('logged out', props);
        auth.logout(() => {
            props.props.history.push('/');
            localStorage.clear();
        });
    }

    const menuId = open ? 'primary-search-account-menu' : undefined;
    const renderMenu = (
        <Popover
            id={menuId}
            open={isMenuOpen}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorPosition={{ top: 0, left: 550 }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            style={{ top: '48px' }}
        >
            <div className='profile-div'>
                <Avatar className={classes.profileAvatar}><img src={Keep} alt='anuja' /></Avatar>
                <Typography className={classes.name} >{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</Typography>
                <Typography className={classes.email}>{localStorage.getItem('email')}</Typography>
                <div className='line' />
                <Button className={classes.signout_button} onClick={handleSignout}>Sign out</Button>
                <div className='line' />
            </div>
        </Popover>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="default">
                    <Refresh />
                </IconButton>
                <p>Refresh</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <img src={grid} style={{ width: '1em' }} />
                </IconButton>
                <p>Grid</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    style={{ padding: '8px' }}
                >
                    <Avatar className={classes.avatar}>
                        <img src={Keep} alt='keep icon' />
                    </Avatar>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.grow}>
                <AppBar position="static" color="inherit" className='appbar' style={{ borderBottom: '1px solid #dadada' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => drawerRef.current.handleDrawerOpen()}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src={Keep} alt='keep icon' />
                        <Typography className={classes.title} variant="h6">
                            Fundoo
                        </Typography>
                        <div className={classes.search} >
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Refresh />
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <img src={grid} style={{ width: '1em' }} />
                            </IconButton>
                            {/* <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >

                                <Avatar>
                                    <img src={Keep} alt='keep icon' />
                                </Avatar>
                            </IconButton> */}

                            <Avatar aria-describedby={menuId} onClick={handleProfileMenuOpen} >
                                <img src={Keep} alt='keep icon' />
                            </Avatar>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>
            <DrawerLeft ref={drawerRef} props={props}/>

        </MuiThemeProvider>

    );
}