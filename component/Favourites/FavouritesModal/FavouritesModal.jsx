import * as React from 'react';
// Material UI modal component where uses can decided if they'd like to remove a recipe from their
// favourites list.
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
 * @param {Function} props.isFavouritesModalOpen Opens the modal
 * @param {Function} props.removeRecipeFromFavourites Removes the recipe object
 * from the favourite list * array stored on the user's local storage.
 * @param {Function} props.handleCloseFavouriteModal Closes the modal
 * @returns
 */
export default function FavouritesModal({
  title,
  isFavouritesModalOpen,
  removeRecipeFromFavourites,
  handleCloseFavouriteModal,
}) {
  return (
    <div>
      <Dialog
        open={isFavouritesModalOpen}
        onClose={handleCloseFavouriteModal}
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
          {/* Closes the modal and removes the recipe from the favourites recipe list in */}
          {/* local storage */}
          <Button
            onClick={() => {
              handleCloseFavouriteModal();
              removeRecipeFromFavourites();
            }}
          >
            Remove recipe
          </Button>
          <Button onClick={handleCloseFavouriteModal} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
