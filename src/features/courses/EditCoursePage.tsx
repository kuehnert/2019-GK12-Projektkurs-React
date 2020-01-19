import { AppBar, Box, Tabs, Tab, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useCourse, useTerm } from '../../utils/selectors';
import { getTerm } from '../terms/termSlice';
import { getCourses } from './courseSlice';
import StudentImport from './StudentImport';
import CourseEnroler from "./CourseEnroler";

interface MatchParams {
  termId: string;
  courseId: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default (props: RouteComponentProps<MatchParams>) => {
  const { termId, courseId } = props.match.params;
  const dispatch = useDispatch();
  const term = useTerm(termId);
  const course = useCourse(termId, courseId);
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  useEffect(() => {
    dispatch(getTerm(termId));
    dispatch(getCourses(termId));
  }, [dispatch, termId, courseId]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (term == null || course == null) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3">{course.name} bearbeiten</Typography>

      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          // textColor="primary"
          centered
          aria-label="Kursdaten bearbeiten">
          <Tab label="Notenkategorien" {...a11yProps(0)} />
          <Tab label="Schriftlichkeit" {...a11yProps(1)} />
          <Tab label="Schülerinnen und Schüler" {...a11yProps(2)} />
          <Tab label="Importieren" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>

      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>

      <TabPanel value={value} index={2}>
        <CourseEnroler term={term} course={course} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <StudentImport term={term} course={course} />
      </TabPanel>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      // backgroundColor: theme.palette.background.paper,
    },
  })
);
