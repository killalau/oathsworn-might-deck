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

  const colors = ["black", "red", "yellow", "white"] as const;
  let ev = 0;
  let hitChance = 0;

  if (app.state.isEncounter) {

    ev = colors.reduce((sum, color) => {
      const { deckAverage, discardAverage } = app.state.encounterDeck[color];
      const deckSize = app.state.encounterDeck[color].deck.length;
      const selectedCount = app.state.selections[color];
    
      const deckContribution = Math.min(selectedCount, deckSize) * deckAverage;
      const discardContribution = Math.max(selectedCount - deckSize, 0) * discardAverage;

      return sum + deckContribution + discardContribution;
    }, 0);

    hitChance = 1;

  } else {

    ev = colors.reduce((sum, color) => {
      const { deckEV, discardEV } = app.state.oathswornDeck[color];
      const deckSize = app.state.oathswornDeck[color].deck.length;
      const selectedCount = app.state.selections[color];
    
      const deckContribution = Math.min(selectedCount, deckSize) * deckEV;
      const discardContribution = Math.max(selectedCount - deckSize, 0) * discardEV;

      return sum + deckContribution + discardContribution;
    }, 0);

    // Precompute probabilities of zero and one blanks for each color.
    const probZeroBlankSingleDeck = colors.reduce((acc, color) => {
      acc[color] = app.state.oathswornDeck[color].probZeroBlank(app.state.selections[color]);
      return acc;
    }, {} as Record<typeof colors[number], number>);
    const probOneBlankSingleDeck = colors.reduce((acc, color) => {
      acc[color] = app.state.oathswornDeck[color].probOneBlank(app.state.selections[color]);
      return acc;
    }, {} as Record<typeof colors[number], number>);
    
    hitChance = colors.reduce(
      (prob, color) => prob * probZeroBlankSingleDeck[color],
      1
    )

    // Calculate probabilities of exactly one blank across all color scenarios.
    const probOneBlank = colors.map((excludedColor) =>
      colors
        .filter((color) => color !== excludedColor)
        .reduce(
          (prob, color) => prob * probZeroBlankSingleDeck[color],
          1
        ) * probOneBlankSingleDeck[excludedColor]
    );

    // Sum up all the probabilities for exactly one blank.
    hitChance += probOneBlank.reduce((sum, value) => sum + value, 0);

  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} container>
        <Grid item xs={6} sm={3}>
          <Typography>Expected Value: {ev.toFixed(1)}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography>Hit Chance: {(hitChance*100).toFixed(0)}%</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography>Corrected EV: {(ev*hitChance).toFixed(1)}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
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
