import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/**
 * Modal that prompts user to confirm if they'd like to remove the recipe from the favourites list.
 * @param {object} props
 * @param {string} props.title Recipe title
 * @param {Function} props.open Opens the modal
 * @param {Function} props.removeFromFavourites Removes the recipe object from the favourite list
 * array stored on the user's local storage.
 * @param {Function} props.handleClose Closes the modal
 * @returns
 */
export default function FavouritesModal({
  title,
  open,
  removeFromFavourites,
  handleClose,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove recipe?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to remove 
            "${title}"
            from your favourites list?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              removeFromFavourites();
            }}
          >
            Remove
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
