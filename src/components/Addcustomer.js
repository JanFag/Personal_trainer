import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import {green, purple} from '@material-ui/core/colors';
import { withStyles, makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));


export default function Addcustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '',  postcode: '', city: '', email: '', phone: ''
      });
    
    const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);
  
  
  const handleClose = () => {
      
      setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = (event, reason) => {
    if(reason === 'clickaway') {
        return;
    }

    setOpen1(false);
};

  const handleInputCnange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value})
  };

  const handleClick1 = () => {
    setOpen1(true);
};
  const addCustomer = () => {
      props.saveCustomer(customer);
      handleClose();
      handleClick1();
  };
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);

    return (
        <div>
         <ColorButton variant="contained" color="primary" className= {classes.margin} onClick={handleClickOpen}>
            New customer
        </ColorButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
            <DialogContent> 
                     <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={e => handleInputCnange(e)}
                        label="Firstname"                        
                        fullWidth
                    />       
                    <TextField
                        
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={e => handleInputCnange(e)}
                        label="Lastname"                        
                        fullWidth
                        
                    />
                     
                     <TextField
                        
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={e => handleInputCnange(e)}
                        label="Streetaddress"                        
                        fullWidth
                    />       
                     <TextField
                        
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={e => handleInputCnange(e)}
                        label="Postcode"                        
                        fullWidth
                    />       

                    <TextField
                        
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={e => handleInputCnange(e)}
                        label="City"                        
                        fullWidth
                    />       
                    <TextField
                        
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={e => handleInputCnange(e)}
                        label="Email"                        
                        fullWidth
                    />       
                    <TextField
                        
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={e => handleInputCnange(e)}
                        label="Phone"                        
                        fullWidth
                    />       
                     
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={addCustomer} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open1}
                autoHideDuration={6000}
                onClose={handleClose1}
                message="The customer was added"
                action={
                    <React.Fragment>
                    <Button color="secondary" size="small" onClick={handleClose1}>
                        Close
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose1}>              
                    </IconButton>
                    </React.Fragment>
        }
        />
    </div>
    );
}