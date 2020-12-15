import React from 'react';
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  IconButton
} from "@material-ui/core";
import {
  Star,
} from '@material-ui/icons';

export default function MyCard(props) {
  const cardData = props.cardData;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {cardData.title}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <Star/>
        </IconButton>
      </CardActions>
    </Card>
  )
}