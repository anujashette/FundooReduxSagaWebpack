// import React from 'react';
// import TakeNote from './TakeNote';
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';


// const useStyles = makeStyles(theme => ({

//     content: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       marginLeft: -'240px',
//     },
//     contentShift: {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//       //  [theme.breakpoints.up('sm')]: {
//       //         display: 'none',
//       //     },
//     },
//     drawerHeader: {
//         display: 'flex',
//         alignItems: 'center',
//         padding: theme.spacing(0, 1),
//         ...theme.mixins.toolbar,
//         justifyContent: 'flex-end',
//       },
//   }));

// function DisplayArea(props) {
//     const classes = useStyles();

//     return (
//         <div>
//              <main
//           className={clsx(classes.content, {
//             [classes.contentShift]: open,
//           })}
//           style={{display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',}}
//         >
//           <div className={classes.drawerHeader} />
//           <TakeNote props={props} />
          
//         </main>
//         </div>
//     )
// }

// export default DisplayArea;
