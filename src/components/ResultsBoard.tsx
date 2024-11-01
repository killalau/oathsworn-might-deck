import { Chip, Grid, Typography, colors } from '@mui/material';
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
  const damage = values.reduce((p, c) => p + c.value, 0);
  const criticalHits = values.filter((v) => v.critical).length;
  const blanks = values.filter((v) => !v.value).length;
  const missed = !app.state.isEncounter && blanks >= 2;

  const colors = ["black", "red", "yellow", "white"] as const;

  const evOS = colors.reduce(
    (sum, color) => sum + app.state.oathswornDeck[color].ev * app.state.selections[color],
    0
  );
  const evE = colors.reduce(
    (sum, color) => sum + app.state.encounterDeck[color].ev * app.state.selections[color],
    0
  );
  let hitChance = colors.reduce(
    (prob, color) => prob*app.state.oathswornDeck[color].probZeroBlank(app.state.selections[color]),
    1
  )

  const hitChanceOneBlank = colors.map((excludedColor) =>
    colors
      .filter((color) => color !== excludedColor)
      .reduce(
        (prob, color) =>
          prob * app.state.oathswornDeck[color].probZeroBlank(app.state.selections[color]),
        1
      )*app.state.oathswornDeck[excludedColor].probOneBlank(app.state.selections[excludedColor])
  );

  hitChance += hitChanceOneBlank.reduce((sum, value) => sum + value, 0);
 

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} container>
        <Grid item xs={6} sm={3}>
          <Typography>Expected Value: {app.state.isEncounter ? evE.toFixed(1) : evOS.toFixed(1)}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography>Hit Chance: {app.state.isEncounter ? 100 : (hitChance*100).toFixed(0)}%</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography>Corrected EV: {app.state.isEncounter ? evE.toFixed(1) : (evOS*hitChance).toFixed(1)}</Typography>
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
          {values.map((v, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <CMightCard
                color={v.color}
                front
                type={app.state.isEncounter ? 'encounter' : 'oathsworn'}
                value={v}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CResultsBoard;
