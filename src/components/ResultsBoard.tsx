import { Chip, Grid, Typography, colors } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { useAppState } from '../data/AppState';
import MightCard from '../data/MightCard';
import CMightCard from './Card';
import { MightCardsSelection } from '../data/MightDeckOrganizer';

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

  const deck = app.state.isEncounter ? app.state.encounterDeck : app.state.oathswornDeck;
  const damageEV = (Object.keys(app.state.selections) as Array<keyof MightCardsSelection>).reduce((p: number, c) => {
    return p + deck[c].nextCardEV * app.state.selections[c];
  }, 0)
    .toFixed(1);
  const deckColors = (Object.keys(app.state.selections) as Array<keyof MightCardsSelection>)
  const p0 = app.state.isEncounter ? 0 : deckColors.reduce((prev: number, cur) => {
    return prev * deck[cur].zeroBlanksProbability(app.state.selections[cur]);
  }, 1);
  const p1 = deckColors.reduce((prev: number, cur) => {
    const p = deckColors.reduce((p: number, c) => {
      return cur === c ?
        p * deck[c].exactlyOneBlankProbability(app.state.selections[c]) :
        p * deck[c].zeroBlanksProbability(app.state.selections[c]);
    }, 1)
    return prev + p;
  }, 0);
  const hitChance = (p0 + p1) * 100;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} container>
        <Grid item xs={6} sm={4}>
          <Typography>Damage (EV): {damageEV}</Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Typography>Hit Chance: {hitChance.toFixed(0)}%</Typography>
        </Grid>
      </Grid>
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
