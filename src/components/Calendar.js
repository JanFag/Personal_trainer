import React from "react";
import { Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: '#009688',
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
    background: '#ff5722'
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
    background: '#fbe9e7'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'left',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    background: '#ff5722'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    background: '#ff5722'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Calendarpage(){ 
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpendrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpendrawer(true);
  };
  
  
  const handleDrawerClose = () => {
    setOpendrawer(false);
  };
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


  moment.locale("fi-FI");
  const localizer = momentLocalizer(moment);
  const [items, setItems] = React.useState([]);  
  const item = [];

  React.useEffect(() => {
      fetch('https://customerrest.herokuapp.com/gettrainings',
      {method: "POST",
      headers:{ 'Accept': 'application/json ', 'Content-Type': 'application/json   ', }
      })
      
      .then(response => response.json()
      .then(data => {
        
        let events = data;
        
        
          for(let k = 0; k<events.length; k++){
            
            item.push({
              title: events[k].activity + "/" + events[k].customer.firstname + " " + events[k].customer.lastname,
              start: getStart(events[k].date), 
              end: getnewDate(events[k].date, events[k].duration)              
            })
          }
          console.log(item);
          setItems(item);
      },
      (error) => ({
        
      })))
      
      });

  function getStart (date) {
    const aika = moment.utc(date);
    const paiva = moment.utc(aika).date();
    const kk = moment(aika).month();
    const year = moment(aika).year();
    let hour = moment(aika).hours();
    let min = moment(aika).minutes();
    const newdate = new Date(year, kk, paiva, hour, min);
    return newdate;
  }

  function getnewDate (date, duration) {
  const aika = moment.utc(date);
  const paiva = moment.utc(aika).date();
  const kk = moment(aika).month();
  const year = moment(aika).year();
  let hour = moment(aika).hours();
  let min = moment(aika).minutes();
  let endhour = '';
  let endmin = min + duration;
  

  if(endmin >= 60 && endmin <120){
    const apu  = endmin - 60;
    endmin = apu; 
    endhour = hour + 1;
    if(endhour === 24){
      endhour=0;
    }
  }
  if (endmin >= 120){
    endhour = hour + (Math.floor(endmin/60));
    endmin= endmin-(60*Math.floor(endmin/60));
  
  } 
  
  let enddate = new Date(year, kk, paiva, endhour, endmin);
  return enddate;

  }
  
  
  return (
  <div style={{ height: 700 }}>
         <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Calendar
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
                onClick={showTrainings}   
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
        className={clsx(classes.content )}
      >
      </main>
    
    <Calendar
      localizer={localizer}
      events={items}
      step={15}
      timeslots={8}
      showMultiDayTimes
      min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
      max={new Date(2022, 0, 1, 17, 0)} // Max will be 6.00 PM!
      defaultView={Views.MONTH}
      
    />
  </div>
  );

}
