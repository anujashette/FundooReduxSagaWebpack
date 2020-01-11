import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Bulb from '../Assets/bulb.svg';
import Archive from '@material-ui/icons/ArchiveOutlined';
import Notification from '@material-ui/icons/NotificationsNoneOutlined'
import EditOutline from '@material-ui/icons/EditOutlined'
import LabelIcon from '@material-ui/icons/LabelOutlined'
import Trash from '@material-ui/icons/DeleteOutlined'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import '../styles/drawer.scss';
import DisplayArea from './DisplayArea';

const { forwardRef, useImperativeHandle } = React;
const drawerWidth = 240;

const overrideTheme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        top: '65px'
      }
    }
  }
})

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },


  drawer: {
    width: drawerWidth,
    flexShrink: 0
    
    
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight:'0px'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    //  [theme.breakpoints.up('sm')]: {
    //         display: 'none',
    //     },
  },
}));

const DrawerLeft = forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({

    handleDrawerOpen() {
      setOpen(!open);
    }
  }));



  return (
    <div className={classes.root}>

      <MuiThemeProvider theme={overrideTheme}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <List>
            <ListItem button>
              <ListItemIcon><img src={Bulb} alt="notes_icon" /></ListItemIcon>
              <ListItemText primary='Notes' />
            </ListItem>

            <ListItem button>
              <ListItemIcon>{<Notification />}</ListItemIcon>
              <ListItemText primary='Reminder' />
            </ListItem>
          </List>

          <Divider />
          <p className='label-style'>Labels</p>
          <List>
            <ListItem button>
              <ListItemIcon><LabelIcon /></ListItemIcon>
              <ListItemText primary='labels' />
            </ListItem>

            <ListItem button>
              <ListItemIcon>{<EditOutline />}</ListItemIcon>
              <ListItemText primary='Edit labels' />
            </ListItem>
          </List>

          <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><Archive /></ListItemIcon>
            <ListItemText primary='Archive' />
          </ListItem>

          <ListItem button>
            <ListItemIcon>{<Trash />}</ListItemIcon>
            <ListItemText primary='Bin' />
          </ListItem>
        </List>


        </Drawer>

        {/* <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
          style={{display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',}}
        >
          <div className={classes.drawerHeader} />
           <DisplayArea props={props}/>
        </main> */}

      </MuiThemeProvider>
    </div>
  );
});

export default DrawerLeft;