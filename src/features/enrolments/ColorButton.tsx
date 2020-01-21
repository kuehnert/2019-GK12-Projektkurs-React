import { Button, Theme, ButtonProps } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

interface Props {
  hoverText?: string;
}

const ColorButton: React.FC<Props & ButtonProps> = ({ children, hoverText, ...other }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  return (
    <Button className={classes.root} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} {...other}>
      {/* {children} {hover && hoverText} */}
      {hover ? hoverText : children}
    </Button>
  );
};

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 0,
      marginLeft: spacing(1),
      marginRight: spacing(1),
      padding: spacing(0),
      paddingLeft: spacing(1),
      paddingRight: spacing(1),
      color: palette.primary.main,
      fontSize: '1rem',

      '&:hover': {
        color: palette.primary.contrastText,
        backgroundColor: palette.primary.main,
      },
    },
  })
);

export default ColorButton;
