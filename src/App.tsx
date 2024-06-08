import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import CMightDeckOrganizer from './components/Organizer';
import { useAppState } from './data/AppState';
import CResultsBoard from './components/ResultsBoard';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    paddingTop: 48,
    paddingBottom: 48,
  },
  main: {},
  organizer: {},
  results: {},
}));

function App() {
  const app = useAppState();
  const classes = useStyles();
  const { isEncounter, encounterDeck, oathswornDeck, selections, drawResults } =
    app.state;

  return (
    <div className={classes.root}>
      <AppBar color="default">
        <Toolbar variant="dense" disableGutters>
          <div></div>
          <Button
            variant="text"
            color={isEncounter ? 'error' : 'inherit'}
            sx={{ flexGrow: 1, textAlign: 'center' }}
            onClick={app.actions.toggleDeck}
          >
            {isEncounter ? 'Encounter Deck' : 'Oathsworn Might Deck'}
          </Button>
          <div></div>
        </Toolbar>
      </AppBar>

      <Grid container padding={2} spacing={2} className={classes.main}>
        <Grid item xs={12} sm={4}>
          <CMightDeckOrganizer
            type={isEncounter ? 'encounter' : 'oathsworn'}
            value={isEncounter ? encounterDeck : oathswornDeck}
            selected={selections}
            onSelect={app.actions.setSelections}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CResultsBoard values={drawResults} />
        </Grid>
      </Grid>

      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }} color="default">
        <Toolbar variant="dense" sx={{ gap: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ flexGrow: 1 }}
            onClick={app.actions.resetSelections}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ flexGrow: 1 }}
            onClick={app.actions.discardDrawResults}
          >
            Discard
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ flexGrow: 1 }}
            disabled={
              !selections.white &&
              !selections.yellow &&
              !selections.red &&
              !selections.black
            }
            onClick={app.actions.confirmDraw}
          >
            Draw
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
