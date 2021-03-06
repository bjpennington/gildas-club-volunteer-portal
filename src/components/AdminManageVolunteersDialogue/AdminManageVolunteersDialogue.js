import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { connect } from 'react-redux'
import { USER_ACTIONS } from '../../redux/actions/userActions';
import AdminManageVolunteersDialogueTable from '../AdminManageVolunteersDialogueTable/AdminManageVolunteersDialgueTable'
import AdminManageVolunteersDialogueAutoComplete from '../AdminManageVolunteersDialogueAutoComplete/AdminManageVolunteersDialogueAutoComplete';
import {withStyles} from '@material-ui/core';

const styles = {
  button: {
      margin: 5,
      display: 'flex',
      alignItems: 'flex-end',
  },
};



class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = (id) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount(){
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({
      type: 'GET_CERTIFIED_VOLUNTEERS'
    })

  }
  
  render() {
  
 
    

    return (
      <div>
      
        <Button className={this.props.classes.button} size="small" color="primary" variant="raised" onClick={this.handleClickOpen}>Manage Volunteers</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle style={{textAlign: 'center'}} id="responsive-dialog-title">{`Volunteers for ${this.props.opportunity.title}`}</DialogTitle>
          <AdminManageVolunteersDialogueTable opportunity = {this.props.opportunity}/>
          <DialogContent>
            <DialogContentText>
             Add a Volunteer!
            </DialogContentText>
          
          <AdminManageVolunteersDialogueAutoComplete opportunity = {this.props.opportunity}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    state
  });

const connectedResponsiveDialog = connect(mapStateToProps)(withMobileDialog()(ResponsiveDialog));

export default withStyles(styles)(connectedResponsiveDialog);