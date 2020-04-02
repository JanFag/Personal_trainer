import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import moment from "moment";

export default function Addtraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
        date: '', duration: '', activity: '',  customer: ''
      });
    

  const [open1, setOpen1] = React.useState(false);
  
  moment.locale("fi-FI");
  
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
    setTraining({...training, [event.target.name]: event.target.value})
  };

  const handleClick1 = () => {
    setOpen1(true);
};
  const addTraining = () => {
      props.saveTraining(training);
      handleClose();
      handleClick1();
  };

 const setTrainingCustomer = (value) => {
     setTraining({date: '', duration: '', activity: '',  customer: value})
 }
 React.useEffect(() => setTrainingCustomer(props.linkki));
 

    return (
        <div>
            
        <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
            Add training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Training</DialogTitle>
            <DialogContent> 
                     <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputCnange(e)}
                        label="Activity"                        
                        fullWidth
                    />       
                    <TextField
                        
                        margin="dense"
                        name="date"
                        type="datetime-local"
                        value={training.date}
                        onChange={e => handleInputCnange(e)}
                        label="Date"                        
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                     
                     <TextField
                        
                        margin="dense"
                        name="duration"
                        type="numeric"                        
                        value={training.duration}
                        onChange={e => handleInputCnange(e)}
                        label="Duration in minutes"                        
                        fullWidth
                    />
                   
                     <TextField
                        
                        margin="dense"
                        name="customername"                        
                        defaultValue={props.customername}                                 
                        label="Customer"                        
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        
                          }}
                    />
                    
                     
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={addTraining} color="primary">
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
                autoHideDuration={4000}
                onClose={handleClose1}
                message="The training was added"
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