import React from 'react';
import logo from './logo.svg';
import './App.css';
import './AspectRatio.css';
import { AppBar, CssBaseline, Toolbar, Grid } from '@mui/material';
import CMightCard from './components/Card';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MightCard from './data/MightCard';

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <CMightCard
              type="encounter"
              color="white"
              value={new MightCard(1, false)}
            ></CMightCard>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CMightCard
              type="encounter"
              color="yellow"
              front
              value={new MightCard(2, false)}
            ></CMightCard>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CMightCard
              type="oathsworn"
              color="red"
              value={new MightCard(3, true)}
            ></CMightCard>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CMightCard
              type="oathsworn"
              color="black"
              front
              value={new MightCard(4, true)}
            ></CMightCard>
          </Grid>
        </Grid>
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar variant="dense">hi</Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default App;
