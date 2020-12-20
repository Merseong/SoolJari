import React from 'react';
import {
  CircularProgress,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAllCards } from '../firebase';
import { useDataDispatch } from '../customs/DataContext';

function waitUntilValue(inputValue) {
  return new Promise((res, rej) => {
    (function waitValue() {
      if (inputValue !== '') res();
      else setTimeout(waitValue, 1000);
    })();
  })
}

const nullOption = {
  name: '',
  val: null
}

export default function SearchBar() {
  const [value, setValue] = React.useState(nullOption);
  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const dataDispatch = useDataDispatch();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      /* example
      const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
      const countries = await response.json();

      if (active) {
        setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
        console.log(Object.keys(countries).map((key) => countries[key].item[0]));
      }
      */
      await waitUntilValue(inputValue);
      const response = await getAllCards();

      if (active) {
        setOptions([...response.map(doc => { return {
          name: doc.title,
          val: doc,
        }}), nullOption]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const addCardButtonAction = () => {
    if (value !== nullOption) {
      //alert(value.name);
      //console.log(value.val);
      dataDispatch({
        type: 'add',
        card: value.val,
      })
    }
    setValue(nullOption);
  }

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: 300, display: 'inline-block' }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={options}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        filterOptions={(options) => options.filter(option => option.val)}
        loading={loading}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(e, newInput) => {
          setInputValue(newInput);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search..."
            variant='standard'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
              style:{
                'color': 'white'
              }
            }}
            InputLabelProps={{
              style:{
                'color': 'white'
              }
            }}
          />
        )}
      />
      <IconButton
        color='inherit'
        style={{ display: 'inline-block', marginTop: 8 }}
        onClick={addCardButtonAction}
      >
        <Add/>
      </IconButton>
    </>
  );
}