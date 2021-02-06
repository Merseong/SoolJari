import React from 'react';
import {
	IconButton,
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText
} from '@material-ui/core';
import {
	Add
} from '@material-ui/icons';

export default function AddLinkDialog() {
	const [open, setOpen] = React.useState(false);
	
	const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
	
	return (
		<div>
			<IconButton onClick={handleClickOpen}>
				<Add/>
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle id="form-dialog-title">링크 추가</DialogTitle>
				<DialogContent>
          <DialogContentText>
            제목으로 검색해서 입력하면 됩니다
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
			</Dialog>
		</div>
	)
}