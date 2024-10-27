import { Badge } from '@mui/material';
import { FC } from 'react';
import MightDeck from '../data/MightDeck';
import CMightCard from './Card';

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
  return (
    <div>
      <CMightCard
        type={type}
        color={value?.dice?.color}
        value={value?.deck?.[0]}
        onClick={onSelect}
      />
      <Badge color="primary" badgeContent={selected} sx={{ float: 'right' }} />
      Remaining: {value?.deck?.length ?? 0} / EV: {value?.ev.toFixed(1) ?? 0} <br></br>
      Blanks: {value?.blanks ?? 0} / Crits: {value?.crits ?? 0} 
    </div>
  );
};

export default CMigthDeck;
