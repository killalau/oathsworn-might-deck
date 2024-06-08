import { Chip, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { useAppState } from '../data/AppState';
import MightCard from '../data/MightCard';
import CMightCard from './Card';

export type CResultsBoardProps = {
  values: MightCard[];
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CResultsBoard: FC<CResultsBoardProps> = ({ values }) => {
  const app = useAppState();
  const classes = useStyles();
  const damage = values.reduce((p, c) => p + c.value, 0);
  const criticalHits = values.filter((v) => v.critical).length;
  const blanks = values.filter((v) => !v.value).length;
  const missed = app.state.isEncounter && blanks >= 2;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} container>
        <Grid item xs={3}>
          <Typography>Damage: {damage}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Critical Hits: {criticalHits}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Blanks: {blanks}</Typography>
        </Grid>
        <Grid item xs={3}>
          {missed && <Chip color="error" label="Missed" size="small" />}
        </Grid>
      </Grid>
      {values.map((v, i) => (
        <Grid item xs={3} sm={3}>
          <CMightCard
            key={i}
            color={v.color}
            front
            type={app.state.isEncounter ? 'encounter' : 'oathsworn'}
            value={v}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CResultsBoard;
