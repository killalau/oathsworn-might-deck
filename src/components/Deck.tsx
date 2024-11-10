import { Badge, Box, Grid } from '@mui/material';
import { FC } from 'react';
import MightDeck from '../data/MightDeck';
import CMightCard from './Card';
import SunIcon from './icons/Sun';
import CloseIcon from './icons/Close';
import CardDiamondsIcon from './icons/CardDiamonds';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  icon: {
    width: 16,
    height: 16,
    marginTop: 2,
    marginBottom: -2,
  }
}));

export type CMigthDeckProps = {
  type: 'encounter' | 'oathsworn';
  value?: MightDeck;
  selected?: number;
  onSelect?: () => void;
};

const CMigthDeck: FC<CMigthDeckProps> = ({
  type,
  value,
  selected = 0,
  onSelect,
}) => {
  const classes = useStyles();
  return (
    <div>
      <CMightCard
        type={type}
        color={value?.dice?.color}
        value={value?.deck?.[0]}
        onClick={onSelect}
      />
      <Badge color="primary" badgeContent={selected} sx={{ float: 'right' }} />
      <Grid container textAlign="center">
        <Grid item xs={3}>
          <CardDiamondsIcon className={classes.icon} />
          <Box>{value?.deck?.length ?? 0}</Box>
        </Grid>
        <Grid item xs={3} >
          <Box>EV</Box>
          <Box>{value?.nextCardEV?.toFixed(1) ?? 0}</Box>
        </Grid>
        <Grid item xs={3} >
          <SunIcon className={classes.icon} />
          <Box>{value?.nCriticals ?? 0}</Box>
        </Grid>
        <Grid item xs={3} >
          <CloseIcon className={classes.icon} />
          <Box>{value?.nBlanks ?? 0}</Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default CMigthDeck;
