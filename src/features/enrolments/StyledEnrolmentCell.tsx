import { TableCell, Theme } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';

const StyledEnrolmentCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

export default StyledEnrolmentCell;
