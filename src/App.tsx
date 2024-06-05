import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  colors,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import './App.css';
import './AspectRatio.css';
import CMightDeckOrganizer from './components/Organizer';
import MightDeckOrganizer, {
  MightCardsSelection,
  defaultMightCardsSelection,
} from './data/MightDeckOrganizer';
import MightCard from './data/MightCard';

const theme = createTheme({
  palette: {
    secondary: {
      main: colors.grey[900],
    },
    warning: {
      main: colors.yellow[700],
    },
    error: {
      main: colors.red[800],
    },
  },
});

function App() {
  const [isEncounter, setIsEncounter] = useState(true);
  const [encounterDeck, setEncounterDeck] = useState(
    new MightDeckOrganizer(true),
  );
  const [oathswornDeck, setOathswornDeck] = useState(
    new MightDeckOrganizer(true),
  );
  const [selections, setSelections] = useState<MightCardsSelection>({
    ...defaultMightCardsSelection,
  });
  const [drewCards, setDrewCards] = useState<MightCard[]>([]);

  const toggleEncounter = () => {
    setIsEncounter((d) => !d);
  };

  const handleReset = () => {
    setSelections({ ...defaultMightCardsSelection });
  };

  const handleDraw = () => {
    const deck = isEncounter ? encounterDeck : oathswornDeck;
    const updates = deck.clone();
    const result = [
      ...updates.white.drawN(selections.white),
      ...updates.yellow.drawN(selections.yellow),
      ...updates.red.drawN(selections.red),
      ...updates.black.drawN(selections.black),
    ];
    if (isEncounter) {
      setEncounterDeck(updates);
    } else {
      setOathswornDeck(updates);
    }
    setDrewCards(result);
    setSelections({ ...defaultMightCardsSelection });
  };

  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="default">
          <Toolbar variant="dense" disableGutters>
            <div></div>
            <Button
              variant="text"
              color={isEncounter ? 'error' : 'inherit'}
              sx={{ flexGrow: 1, textAlign: 'center' }}
              onClick={toggleEncounter}
            >
              {isEncounter ? 'Encounter Deck' : 'Oathsworn Might Deck'}
            </Button>
            <div></div>
          </Toolbar>
        </AppBar>

        <Grid container padding={2}>
          <Grid item xs={12}>
            <CMightDeckOrganizer
              type={isEncounter ? 'encounter' : 'oathsworn'}
              value={isEncounter ? encounterDeck : oathswornDeck}
              selected={selections}
              onSelect={(event) => setSelections(event)}
            />
          </Grid>
          <Grid item xs={12}>
            {drewCards.map((d) => d.toString())}
          </Grid>
        </Grid>

        <AppBar
          position="fixed"
          sx={{ top: 'auto', bottom: 0 }}
          color="default"
        >
          <Toolbar variant="dense" sx={{ gap: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ flexGrow: 1 }}
              onClick={handleReset}
            >
              Reset
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
              onClick={handleDraw}
            >
              Draw
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default App;
