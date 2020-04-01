import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FaceIcon from '@material-ui/icons/Face';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import 'moment-timezone';
import { useHistory } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
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
    },
  }));

export default function Traininglist(){ {
    const classes = useStyles();
    const theme = useTheme();
    const [openDrawer, setOpendrawer] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpendrawer(true);
    };
  
    const handleDrawerClose = () => {
      setOpendrawer(false);
    };


    
  
    const [trainings, setTrainings] = useState([]);
   

    useEffect(() => fetchData(), []);
    
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        
    };



    const deleteTraining = (id) => {
        if(window.confirm('Do you want to delete this training?')){
            fetch('https://customerrest.herokuapp.com/api/trainings/'+id, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
            handleClick();
        }
        
    };


    const [open, setOpen] = useState(false);
    const handleClick = () => {
    setOpen(true);
    };

    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    };

    const moment = require('moment');

    const columns = [
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Date',
            accessor: 'data',
            Cell: row => { 
                return moment(row.value).format('DD.MM.YYYY, h:mm:ss a');
            
            }
        },
        {
            Header: 'Duration (min)',
            accessor: 'duration'
        },
        { 
            Header: 'Customer',
            accessor: 'customer',
            Cell: row => {
              return (
                <div>
                  <span >{row.row.customer.firstname}</span>
                  <span> </span>
                  <span >{row.row.customer.lastname}</span>
                </div>
              )},
             
            
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: row => <Button size="small" color="secondary" onClick={()=> deleteTraining(row.row.id)} >Delete</Button>
            
        }
    ]
    const history = useHistory();
 
    const location = {
      pathname: '/trainings',
      state: { fromDashboard: true }
    }; 
     const location2 = {
      pathname: '/',
      state: { fromDashboard: true }
     }
  
     function showCustomers () {
       history.push(location2);
     }
  
    
  
    function showTrainings () {
      
      history.push(location);
    };

    const location3 = {
      pathname: '/calendar',
      state: { fromDashboard: true }
     }
  
  
    function showCalendar () {
      history.push(location3);
    }

    return (
    <div >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Trainings
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        
            <ListItem button                 
                onClick={showCustomers}   
                 >
              <ListItemIcon>
                <FaceIcon  />            
          </ListItemIcon>
              <ListItemText primary={"Customers"} />              
            </ListItem>
            <ListItem button                 
                onClick={showTrainings}   
                 >
              <ListItemIcon>
                <DirectionsRunIcon  />            
          </ListItemIcon>
              <ListItemText primary={"Trainings"} />              
            </ListItem>
            <ListItem button                 
                onClick={showCalendar}   
                 >
              <ListItemIcon>
                <CalendarTodayIcon />            
          </ListItemIcon>
              <ListItemText primary={"Calender"} />              
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      
      </main>

    
            <ReactTable filterable={true} data={trainings} columns={columns} />
            <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="The training was deleted"
                    action={
            <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                Close
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                
            </IconButton>
            </React.Fragment>
            }
            />

        </div>
    )


}}