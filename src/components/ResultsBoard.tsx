import { Chip, Grid, Typography, colors } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { useAppState } from '../data/AppState';
import MightCard from '../data/MightCard';
import CMightCard from './Card';

export type CResultsBoardProps = {
  values: MightCard[][];
};

const useStyles = makeStyles((theme) => ({
  root: {},
  results: {
    background: colors.grey[200],
    padding: 8,
    borderRadius: 8,
    minHeight: '50vh',
  },
}));

const CResultsBoard: FC<CResultsBoardProps> = ({ values }) => {
  const app = useAppState();
  const classes = useStyles();
  const damage = values.flat().reduce((p, c) => p + c.value, 0);
  const criticalHits = values.flat().filter((v) => v.critical).length;
  const blanks = values.flat().filter((v) => !v.value).length;
  const missed = !app.state.isEncounter && blanks >= 2;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} container>
        <Grid item xs={6} sm={3}>
          <Typography>Damage: {damage}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography>Critical Hits: {criticalHits}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography>Blanks: {blanks}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          {missed && <Chip color="error" label="Missed" size="small" />}
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.results}>
        <Grid container spacing={1}>
          {values.map((row, i) =>
            row.map((v, j) => (
              <Grid item xs={6} sm={3} key={`${i}-${j}`}>
                <CMightCard
                  color={v.color}
                  new={i === 0}
                  front
                  type={app.state.isEncounter ? 'encounter' : 'oathsworn'}
                  value={v}
                  selected={app.state.drawResultsSelections[i]?.[j]}
                  onClick={() => app.actions.toggleDrawResultSelection(i, j)}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CResultsBoard;
