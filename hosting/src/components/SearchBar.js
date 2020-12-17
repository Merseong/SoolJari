import React from 'react';
import {
  CircularProgress,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAllCards } from '../firebase';

export default function SearchBar() {
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

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
      const response = await getAllCards();

      if (active) {
        setOptions(response.map(doc => { return {
          name: doc.title,
          val: doc,
        }}));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, value]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const addCardButtonAction = () => {
    if (value !== null) alert(value.name);
    setValue(null);
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
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        inputValue={value}
        onInputChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue);
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