import React from 'react';
import {
  Grid,
  Card,
  Typography,
  CardContent
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    margin: '12px',
  }
}))

export default function DataGrid() {

  const tileData = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14, 15, 16
  ];

  const classes = useStyles();

  return (
    <div className={classes.container}>
    <Grid container justify="flex-start" spacing={2}>
      {
        tileData.map(tile => (
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