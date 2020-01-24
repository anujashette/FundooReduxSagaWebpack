import React, { useEffect } from 'react';
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
import Bulb from '../Assets/bulb.svg';
import Archive from '@material-ui/icons/ArchiveOutlined';
import Notification from '@material-ui/icons/NotificationsNoneOutlined'
import EditOutline from '@material-ui/icons/EditOutlined'
import LabelIcon from '@material-ui/icons/LabelOutlined'
import Trash from '@material-ui/icons/DeleteOutlined'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import '../styles/drawer.scss';
import { connect } from 'react-redux';
import { setTransition, unsetTransition, getlabels } from '../actions';

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
});

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
    borderRight: '0px'
  }
}));

const DrawerLeft = forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = props.props.props.history;

  useImperativeHandle(ref, () => ({
    handleDrawerOpen() {
      setOpen(!open);
      if (!open) {
        props.dispatch(setTransition());
      }
      else {
        props.dispatch(unsetTransition());
      }
    }
  }));

  const handleNotes = () => {
    props.dispatch({ type: 'APPBAR_TITLE', appbarTitle: 'Fundoo' });
    history.push('/dashboard/*/notes')
  }

  const handleReminder = () => {
    props.dispatch({ type: 'APPBAR_TITLE', appbarTitle: 'Reminder' });
    history.push('/dashboard/*/reminder');
  }

  const handleLabels = (labelName) => {
    props.dispatch({ type: 'APPBAR_TITLE', appbarTitle: labelName });

    props.props.handleLabelNotesLoad(labelName);
  }

  const handleEditLabel = () => {

    props.dispatch({ type: 'EDIT_LABEL_OPEN', editLabelDialog: true })
  }

  const handleArchive = () => {
    props.dispatch({ type: 'APPBAR_TITLE', appbarTitle: 'Archive' });
    history.push('/dashboard/*/archive');
  }

  const handleBin = () => {
    props.dispatch({ type: 'APPBAR_TITLE', appbarTitle: 'Bin' });
    history.push('/dashboard/*/bin');
  }

  useEffect(() => {
    props.dispatch(getlabels());
  }, []);

  const labelsList = props.reduxState.state.labels.map((label, index) => {
    return (
      <ListItem key={index} button id='drawer-item' onClick={() => handleLabels(label.label)}>
        <ListItemIcon><LabelIcon /></ListItemIcon>
        <ListItemText primary={label.label} />
      </ListItem>);
  })

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
            <ListItem button id='drawer-item' onClick={handleNotes}>
              <ListItemIcon><img src={Bulb} alt="notes_icon" /></ListItemIcon>
              <ListItemText primary='Notes' />
            </ListItem>

            <ListItem button id='drawer-item' onClick={handleReminder}>
              <ListItemIcon><Notification /></ListItemIcon>
              <ListItemText primary='Reminder' />
            </ListItem>
          </List>

          <Divider />
          <p className='label-style'>Labels</p>
          <List>
            {labelsList}

            <ListItem button id='drawer-item' onClick={handleEditLabel}>
              <ListItemIcon><EditOutline /></ListItemIcon>
              <ListItemText primary='Edit labels' />
            </ListItem>
          </List>

          <Divider />
          <List>
            <ListItem button id='drawer-item' onClick={handleArchive}>
              <ListItemIcon><Archive /></ListItemIcon>
              <ListItemText primary='Archive' />
            </ListItem>

            <ListItem button id='drawer-item' onClick={handleBin}>
              <ListItemIcon><Trash /></ListItemIcon>
              <ListItemText primary='Bin' />
            </ListItem>
          </List>
        </Drawer>
      </MuiThemeProvider>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    reduxState: {
      state: state
    }
  }
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(DrawerLeft);