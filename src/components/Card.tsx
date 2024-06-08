import { Card, Typography, colors } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { clsx } from 'clsx';
import { FC, ReactNode } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import EncounterBack from '../assets/card_encounter_b.png';
import EncounterFront from '../assets/card_encounter_f.png';
import OathswornBack from '../assets/card_oathsworn_b.png';
import OathswornFront from '../assets/card_oathsworn_f.png';
import MightCard from '../data/MightCard';

export type CMightCardProps = {
  color?: 'white' | 'yellow' | 'red' | 'black';
  type?: 'encounter' | 'oathsworn';
  front?: boolean;
  vertical?: boolean;
  value?: MightCard;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
};

const useStyles = makeStyles((theme) => ({
  root: {},
  selectable: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  white: { background: colors.grey[100], color: colors.common.black },
  yellow: { background: colors.yellow[700], color: colors.common.black },
  red: { background: colors.red[800], color: colors.common.white },
  black: { background: colors.grey[900], color: colors.common.white },
  bg: {
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  front: {},
  back: {},
  encounter: {
    backgroundImage: `url(${EncounterBack})`,
    '&$front': {
      backgroundImage: `url(${EncounterFront})`,
    },
  },
  oathsworn: {
    backgroundImage: `url(${OathswornBack})`,
    '&$front': {
      backgroundImage: `url(${OathswornFront})`,
    },
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    paddingTop: '1vw',
    paddingLeft: '0.2vw',
    '&$critical': {
      fontSize: 'larger',
    },
  },
}));

const CMightCard: FC<CMightCardProps> = ({
  color = 'white',
  type = 'encounter',
  front,
  vertical,
  value,
  onClick,
  className,
  children,
}) => {
  const classes = useStyles();
  const ratio = vertical ? '25/36' : '36/25';

  return (
    <Card
      className={clsx(
        classes.root,
        { [classes.selectable]: !!onClick },
        className,
      )}
      onClick={onClick}
    >
      <AspectRatio
        className={clsx(
          classes.bg,
          classes[color],
          classes[type],
          classes[front ? 'front' : 'back'],
        )}
        ratio={ratio}
      >
        <div className={classes.wrapper}>
          {front && (
            <Typography
              className={clsx(classes.value, {
                critical: value?.critical,
              })}
            >
              {value?.critical ? value?.toString() : value?.value ?? '0'}
            </Typography>
          )}
          {children}
        </div>
      </AspectRatio>
    </Card>
  );
};

export default CMightCard;
