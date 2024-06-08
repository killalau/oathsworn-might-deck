import { Grid } from '@mui/material';
import { FC } from 'react';
import MightDeckOrganizer, {
  MightCardsSelection,
  defaultMightCardsSelection,
} from '../data/MightDeckOrganizer';
import { MigthColor } from '../data/MightCard';
import CMigthDeck from './Deck';

export type CMightDecksProps = {
  type: 'encounter' | 'oathsworn';
  value?: MightDeckOrganizer;
  selected?: MightCardsSelection;
  onSelect?: (event: MightCardsSelection) => void;
};

const CMightDeckOrganizer: FC<CMightDecksProps> = ({
  type,
  value,
  selected = { ...defaultMightCardsSelection },
  onSelect,
}) => {
  const inc = (type: MigthColor) => {
    onSelect?.({
      ...selected,
      [type]: selected[type] + 1,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6}>
        <CMigthDeck
          type={type}
          value={value?.white}
          selected={selected?.white}
          onSelect={() => {
            inc('white');
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <CMigthDeck
          type={type}
          value={value?.yellow}
          selected={selected?.yellow}
          onSelect={() => {
            inc('yellow');
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <CMigthDeck
          type={type}
          value={value?.red}
          selected={selected?.red}
          onSelect={() => {
            inc('red');
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <CMigthDeck
          type={type}
          value={value?.black}
          selected={selected?.black}
          onSelect={() => {
            inc('black');
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CMightDeckOrganizer;
