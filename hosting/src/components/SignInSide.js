import React from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Paper,
	Box,
	Grid,
	Typography
} from '@material-ui/core';
import { LocalBar } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import SimpleDialog from './SimpleDialog';
import { useDataState, useDataDispatch } from '../customs/DataContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
	const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({});
	const dataState = useDataState();
	const dataDispatch = useDataDispatch();
	const [searchVal, setSearchVal] = React.useState('');
  const handleChange = (event) => {
    setSearchVal(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
		if (value === 'addAccount') {
			console.log('add new one');
		} else if (value.title === undefined && selectedValue.title === undefined) {
			console.log('canceled');
		} else {
			setSelectedValue(value);
			dataDispatch({ type: 'set', card: value });
		}
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
			{
				dataState.selectedCard !== null ? 
					<Grid item xs={12} sm={4} md={7}>
						<Typography component="h1" variant="h5">
            {dataState.selectedCard.title}
          	</Typography>
						<p>{dataState.selectedCard.text}</p>
						<Button onClick={() => {
								setSelectedValue({});
								dataDispatch({ type: 'erase' });
							}}>
						X
						</Button>
					</Grid> :
					<Grid item xs={12} sm={4} md={7} className={classes.image} />
			}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalBar />
          </Avatar>
          <Typography component="h1" variant="h5">
            SoolJari
          </Typography>
          <div className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="searchBar"
              label="찾을거?"
              name="searchBar"
							onChange={handleChange}
							onKeyUp={(e) => {
								if (e.key === 'Enter') {
									handleClickOpen();
								}
							}}
							value={searchVal}
              autoFocus
            />
						<Button
							type='submit'
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleClickOpen}
						>
							찾아보기!
						</Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
			<SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} searchWord={searchVal} />
    </Grid>
  );
}
