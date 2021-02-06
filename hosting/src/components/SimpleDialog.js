import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	DialogTitle,
	Dialog,
	CircularProgress
} from '@material-ui/core';
import {
	Person as PersonIcon,
	Add as AddIcon
} from '@material-ui/icons'
import { blue } from '@material-ui/core/colors';
import { searchCards } from '../firebase';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, searchWord } = props;
	const [ searchedList, setSearchedList ] = React.useState([]);
	const [ isSearched, setIsSearched ] = React.useState(false);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
	
	// searchWord를 이용해 검색결과를 가져오는 콜백을 만들고,
	// 그 결과를 쓸 수 있게 만들어야한다.
	React.useEffect(() => {
		if (open && searchWord.length > 0) {
			searchCards(searchWord)
			.then(cards => {
				setIsSearched(true);
				setSearchedList(cards);
			});
		}
		
		return () => {
			setIsSearched(false);
			setSearchedList([]);
		}
	}, [open, searchWord]);

  return (
    <Dialog onClose={handleClose} aria-labelledby="hello-search" open={open}>
      <DialogTitle id="hello-search">검색 결과</DialogTitle>
      <List>
				{
					isSearched ?
					searchedList.map(item => (
          <ListItem button onClick={() => handleListItemClick(item)} key={item.title}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.title} />
          </ListItem>
					)) : <CircularProgress/>
				}
				
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object.isRequired,
	searchWord: PropTypes.string.isRequired,
};