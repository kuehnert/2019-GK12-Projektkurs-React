import { TableRow, Theme } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';

const StyledEnrolmentRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.paper,
      },
    },
  })
)(TableRow);

export default StyledEnrolmentRow;
