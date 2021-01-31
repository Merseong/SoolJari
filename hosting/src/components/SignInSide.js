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
	Typography,
	IconButton,
	Snackbar,
} from '@material-ui/core';
import {
	LocalBar,
	Clear,
	Close,
	Save,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import SimpleDialog from './SimpleDialog';
import { useDataState, useDataDispatch } from '../customs/DataContext';
import { getLinks } from '../firebase';

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
	soolContent: {
		padding: theme.spacing(1),
		'& > *': {
      margin: theme.spacing(1),
    },
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
	const dataState = useDataState();
	const dataDispatch = useDataDispatch();
	const [open, setOpen] = React.useState(false); // 검색창 켜지는 값
  const [selectedValue, setSelectedValue] = React.useState({}); // 검색창에서 선택된 값
	const [searchVal, setSearchVal] = React.useState(''); // 검색창에 들어가는 검색 값
	const [snackbarOpen, setSnackbarOpen] = React.useState(false); // 저장 / 삭제시 snackbar 켜는 값
	const [cardLinks, setCardLinks] = React.useState([]); // 선택된 카드의 링크들
	const [prevId, setPrevId] = React.useState(''); // 이전 선택되었던 선택값 -> 카드 링크 많이 안가져오게 만듬
	
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
	
	const handleSaveButtonClick = () => {
		dataDispatch({ type: 'set', card: selectedValue });
		setSnackbarOpen(true);
	};
	
	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		
		setSnackbarOpen(false);
	};
	
	const handleTextfieldChange = e => {
		let newVal = Object.assign({}, selectedValue);
		//console.log(e.target.id, e.target.value);
		newVal[e.target.id] = e.target.value;
		setSelectedValue(newVal);
	};
	
	React.useEffect(() => {
		if (selectedValue.id && selectedValue.id !== prevId) {
			setPrevId(selectedValue.id);
			getLinks(selectedValue.id)
			.then(links => {
				setCardLinks(links.map(link => {
					let title = link.targetTitles.pop();
					if (title !== selectedValue.title) {
						return title;
					} else {
						return link.targetTitles.pop();
					}
				}))
			});
		}
		
		return () => {
			if (selectedValue.id !== prevId) {
				setCardLinks([]);
			}
		}
	}, [selectedValue, prevId])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
			{
				dataState.selectedCard !== null ? 
					<Grid item xs={12} sm={4} md={7} className={classes.soolContent}>
						<Typography component="h1" variant="h5">
            {dataState.selectedCard.title}
          	</Typography>
						{Object.keys(selectedValue).sort().map((val, idx) => 
							<TextField
								id={val}
								key={idx}
								type={typeof(val).toString()}
								label={val}
								value={selectedValue[val]}
								onChange={handleTextfieldChange}
								style={{
									margin: '8px',
									width: '80%',
								}}
							/>
						)}
						<br/>
						<Typography component="h3" variant="h5">Links</Typography>
						{cardLinks.map(val => 
							<Button variant="outlined">
								{val}
							</Button>
						)}
						<br/>
						<IconButton onClick={() => {
								setSelectedValue({});
								dataDispatch({ type: 'erase' });
							}}>
							<Clear/>
						</IconButton>
						<IconButton onClick={handleSaveButtonClick}>
							<Save/>
						</IconButton>
						<Snackbar
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							open={snackbarOpen}
							autoHideDuration={6000}
							onClose={handleSnackbarClose}
							message="Saved on local"
							action={
								<React.Fragment>
									<Button color="secondary" size="small" onClick={handleSnackbarClose}>
										UNDO
									</Button>
									<IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
										<Close fontSize="small" />
									</IconButton>
								</React.Fragment>
							}
						/>
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
