import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MaterialTable from 'material-table';
import CloseIcon from "@material-ui/icons/Close";
import { forwardRef } from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
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
import Traininglist from './Trainingslist';
import { useHistory } from "react-router-dom";
import Addtraining from './Addtraining';



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

export default function Customerlist(props){ 
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpendrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpendrawer(true);
  };

  const handleDrawerClose = () => {
    setOpendrawer(false);
  };

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };



const [customers, setCustomers] = useState([]);

const columns = [
  { sortable: false,
    filterable: false,
    render: row => {
      return (<Addtraining linkki={row.links[1].href} customername={row.firstname + " " + row.lastname} saveTraining={saveTraining} />);
    }},
  { title: 'Firstame', field: 'firstname'},
  { title: 'Lastname', field: 'lastname'},
  { title: 'Streetaddress', field: 'streetaddress'},
  { title: 'Postcode', field: 'postcode', type: 'numeric'},
  { title: 'City', field: 'city'},
  { title: 'Email', field: 'email'},
  { title: 'Phone', field: 'phone'},
  
   
]


useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
};

const [open, setOpen] = useState(false);
const handleClick = () => {
    setOpen(true);
};

const [openEdit, setOpenedit] = useState(false);
const handleClickEdit = () => {
    setOpenedit(true);
};

const [openAdd, setOpenadd] = useState(false);
const handleClickAdd = () => {
    setOpenadd(true);
};

const deleteCustomer = (link) => {
    
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        handleClick();
    
    
};

const handleClose = (event, reason) => {
    if(reason === 'clickaway') {
        return;
    }

    setOpen(false);
};
const handleCloseEdit = (event, reason) => {
  if(reason === 'clickaway') {
      return;
  }

  setOpenedit(false);
};
const handleCloseAdd = (event, reason) => {
  if(reason === 'clickaway') {
      return;
  }

  setOpenadd(false);
};

const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)

    })
    .then(res => fetchData())
    .catch(err => console.error(err))

    handleClickAdd();
};

const updateCustomer = (customer, link) => {
    fetch(link, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    }) 
    .then(res => fetchData())
    .catch(err => console.error(err))
    handleClickEdit();
    
};
 /*const navigateTrainigs = () => {
    browserHistory.push("/trainings");
  };*/

  const history = useHistory();
 
  const location = {
    pathname: '/trainings',
    state: { fromDashboard: true }
  }; 
   const location2 = {
    pathname: '/',
    state: { fromDashboard: true }
   }
   const location3 = {
    pathname: '/calendar',
    state: { fromDashboard: true }
   }

   function showCustomers () {
     history.push(location2);
   }

  function showCalendar () {
    history.push(location3);
  }

  function showTrainings () {
    
    history.push(location);
  };

  const saveTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
};

  
    return (
    <div>
    
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
            Personal Trainer
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
    
    
    
              
    <MaterialTable


      icons={tableIcons}
      title="Customers"
      columns={columns}
     
      data={customers}

     

      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
                saveCustomer(newData);              
            }, 600);
          }),
          onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                  updateCustomer(newData, oldData.links[0].href);
              }
            }, 600);
          }),
          onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();             
                deleteCustomer(oldData.links[0].href);
            }, 600);
          })
          
          
          
      }}
    />
    
    
    
  

       
        
        <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={openEdit}
                autoHideDuration={4000}
                onClose={handleCloseEdit}
                message="The customer was updated"
                action={
        <React.Fragment>
        <Button color="secondary" size="small" onClick={handleCloseEdit}>
              Close
        </Button>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseEdit}>
              <CloseIcon />
        </IconButton>
        </React.Fragment>
        }
        />
        <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message="The customer was deleted"
                action={
        <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
              Close
        </Button>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon />
        </IconButton>
        </React.Fragment>
        }
        />
        <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={openAdd}
                autoHideDuration={4000}
                onClose={handleCloseAdd}
                message="The customer was added"
                action={
        <React.Fragment>
        <Button color="secondary" size="small" onClick={handleCloseAdd}>
              Close
        </Button>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseAdd}>
        <CloseIcon /> 
        </IconButton>
        </React.Fragment>
        }
        />
        </div>
    );
}
