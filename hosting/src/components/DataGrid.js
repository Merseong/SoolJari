import React from 'react';
import {
  Grid,
  Card,
  Typography,
  CardContent
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useDataState } from '../customs/DataContext';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    margin: '12px',
  }
}))

export default function DataGrid() {

  const cardData = useDataState().cardData;

  const classes = useStyles();

  return (
    <div className={classes.container}>
    <Grid container justify="flex-start" spacing={2}>
      {
        cardData.map(tile => (
          <Grid item xs={6} sm={3} md={2} lg={2}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {tile}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>
    </div>
  )
}