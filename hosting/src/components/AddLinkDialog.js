import React from 'react';
import {
	IconButton,
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	GridList,
	GridListTile
} from '@material-ui/core';
import {
	Add
} from '@material-ui/icons';
import { searchCards } from '../firebase';

export default function AddLinkDialog(props) {
	const {links, setLinks} = props;
	const [open, setOpen] = React.useState(false);
	const [searchStr, setSearchStr] = React.useState(''); // 찾을 제목
	const [selectedId, setSelectedId] = React.useState(''); // 검색해서 찾은것중 선택한 id
	const [selectedTitle, setSelectedTitle] = React.useState('선택된게 없습니다.'); // 검색해서 찾은것중 선택한 타이틀 or 에러메세지같은거?
	const [buttonDisabled, setButtonDisabled] = React.useState(true); // id가 선택되어있을때만 추가 가능하게
	const [searchedCards, setSearchedCards] = React.useState([]); // 검색된 카드들

	const handleSearchFieldChange = (e) => {
		setSearchStr(e.target.value);
	}
	
	const handleSearchButton = () => {
		searchCards(searchStr)
		.then(cards => {
			setSearchedCards(cards);
		});
	}
	
	const handleSearchedCardButton = (id, title) => {
		setSelectedId(id);
		setSelectedTitle(title);
	}
	
	const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
		setSearchStr('');
		setSelectedId('');
		setSelectedTitle('선택된게 없습니다.');
		setSearchedCards([]);
  };
	
	const handleSubmit = () => {
		// link에 추가
		// firebase에도 저장
		handleClose();
	}
	
	React.useEffect(() => {
		// 이미 링크 안에 있는지 확인해야됨 && 자기 자신인지도 확인
		if (selectedId !== '') {
			setButtonDisabled(false);
		}
		
		return () => {
			setButtonDisabled(true);
		}
	}, [selectedId])
	
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
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Grid item>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="이름?"
								fullWidth
								onChange={handleSearchFieldChange}
								value={searchStr}
							/>
						</Grid>
						<Grid item>
							<Button onClick={handleSearchButton}>
								Search
							</Button>
						</Grid>
					</Grid>
					<GridList fullWidth cellHeight={160}>
						{searchedCards.map(card => <GridListTile key={card.id} cols={2}>
								<Button fullWidth onClick={() => handleSearchedCardButton(card.id, card.title)}>
									{card.title}<br/>
									{card.id}
								</Button> />
							</GridListTile>)}
					</GridList>
					{selectedId ?
							<DialogContentText>선택된 카드 : {selectedTitle}<br/>{selectedId}</DialogContentText> :
							<DialogContentText>{selectedTitle}</DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={buttonDisabled}>
            Submit
          </Button>
        </DialogActions>
			</Dialog>
		</div>
	)
}