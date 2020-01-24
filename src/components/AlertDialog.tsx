import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface Props {
  name?: string;
  open: boolean;
  handleOK: () => void;
  handleCancel: () => void;
}

export default function AlertDialog({ name, open, handleCancel, handleOK }: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{'Wirklich löschen?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Möchten Sie {name ? name : 'das Element'} wirklich löschen?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="default">
          Abbrechen
        </Button>
        <Button onClick={handleOK} color="primary" autoFocus>
          Löschen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
