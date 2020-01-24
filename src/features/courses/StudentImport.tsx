import { Box, Button, Card, CardContent, Grid, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { isValid, parse } from 'date-fns';
import papaparse from 'papaparse';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import { formatDate, formatSex } from '../../utils/formatter';
import { Term } from '../terms/termSlice';
import { Course } from './courseSlice';
import { getStudents, createStudents, StudentBase, ImportStudent } from './studentSlice';
import { createEnrolments } from '../enrolments/enrolmentSlice';

interface Props {
  term: Term;
  course: Course;
}

const headerMap: { [key: string]: string } = {
  Nachname: 'lastname',
  Vorname: 'firstname',
  Stufe: 'formGroup',
  Klasse: 'formGroup',
  Geschlecht: 'sex',
  Telefon: 'phone',
  Geburtstag: 'dob',
  Geburtsdatum: 'dob',
  'E-Mail': 'email',
  EMail: 'email',
};

const termStudentColor = '#aaa';
// const courseStudentColor = '#ccc';

const sampleCSV = `Nachname,Vorname,Geschlecht,Telefon,Geburtsdatum,E-Mail
Duck,Daisy,female,02174-123456,25.01.2006,daisy.duck@disney.com
Waschbär,Rocky,male,02175-987654,01.02.2003,rocky@raccoon.org`;

const studentEquals = (a: StudentBase, b: StudentBase) => {
  return a.lastname === b.lastname && a.firstname === b.firstname && a.year === b.year;
};

export default (props: Props) => {
  const { term, course } = props;
  const [csvData, setCsvData] = useState(sampleCSV);
  const [formGroup, setFormGroup] = useState('');
  const [newStudents, setNewStudents] = useState(Array<ImportStudent>());
  const [existingStudentIds, setExistingStudentIds] = useState(Array<string>());
  const termStudents = useSelector((state: RootState) => state.students.students[term.id]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleImport = async () => {
    // const studentsToCreate = newStudents.filter(s => !s.termDuplicate);
    if (newStudents.length > 0) {
      // console.log('Creating', newStudents.length, 'students');
      await dispatch(createStudents(term.id, newStudents));
    }

    // const studentsToEnrol = newStudents.filter(s => !s.courseDuplicate);
    if (existingStudentIds.length > 0) {
      // console.log('Creating', existingStudentIds.length, 'enrolments');
      await dispatch(createEnrolments(term.id, course.id, existingStudentIds));
    }
  };

  const parseCsv = () => {
    const yearResult = formGroup.match(/^(\d+)\w*/);

    if (!yearResult || !termStudents) {
      setNewStudents([]);
      setExistingStudentIds([]);
      return;
    }

    const year = Number(yearResult[1]);
    const result = papaparse.parse(csvData.trim(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: header => headerMap[header.trim()],
      transform: (value, header) => {
        switch (header) {
          case 'dob':
            const date = parse(value, 'dd.MM.yyyy', new Date());
            return isValid(date) ? date : null;

          case 'email':
            return value.trim().toLowerCase();

          case 'sex':
            return value.trim() === 'female' ? 0 : 1;

          default:
            return value.trim();
        }
      },
    });

    const studentData = result.data.map(s => ({ ...s, formGroup, year }));
    const tempNew: ImportStudent[] = [];
    const tempExisting: string[] = [];

    studentData.forEach(s => {
      delete s.undefined;
      const e = Object.values(termStudents).find(t => studentEquals(t, s));

      if (e) {
        tempExisting.push(e.id);
      } else {
        tempNew.push(s);
      }
    });

    setNewStudents(tempNew);
    setExistingStudentIds(tempExisting);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setFormGroup(course.name.replace(/ .+$/, ''));
  }, [course]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => parseCsv(), [csvData, formGroup]);

  useEffect(() => {
    if (termStudents == null) {
      dispatch(getStudents(term.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term.id]);

  if (term == null || course == null || termStudents == null) {
    return <Loading />;
  }

  return (
    <div>
      <Box className={classes.box}>
        <TextField
          id="csv-data"
          label="Schülerdaten im CSV-Format"
          autoFocus
          multiline
          fullWidth
          rows="12"
          value={csvData}
          variant="outlined"
          onChange={event => setCsvData(event.target.value)}
        />
      </Box>

      <div className={classes.box}>
        <TextField
          id="formGroup"
          label="Klasse/Stufe"
          value={formGroup}
          placeholder="5a, 10"
          size="small"
          variant="outlined"
          onChange={e => setFormGroup(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleImport}
          disabled={formGroup === ''}>
          Importieren
        </Button>
      </div>

      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          {newStudents.map((s, i) => (
            <Grid item xs={3} key={`${s.lastname},${s.firstname}`} className={classes.card}>
              <Card className={classes.card} style={{ background: s.termDuplicate ? termStudentColor : '#fff' }}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="h6" color="primary">
                    {s.lastname}, {s.firstname} {formatSex(s.sex)}
                  </Typography>
                  <Typography variant="body2" component="p" color="secondary" className={classes.cardNumber}>
                    {i + 1}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Klasse {s.formGroup || '?'}, *{formatDate(s.dob, 'long') || '?'}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {s.phone || '?'}
                    <br />
                    {s.email || '?'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    box: {
      padding: theme.spacing(0),
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    button: {
      marginLeft: theme.spacing(2),
    },
    paper: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    card: {
      // margin: theme.spacing(1),
      // padding: theme.spacing(1),
    },
    cardContent: {
      margin: theme.spacing(1),
      marginTop: 0,
      marginBottom: 0,
      padding: theme.spacing(0.5),
    },
    cardNumber: {
      display: 'block',
      float: 'right',
      position: 'relative',
      right: '0px',
      top: '30px',
      transform: 'rotate(20deg)',
      width: '2rem',
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      textAlign: 'center',
      padding: theme.spacing(0.5),
      zIndex: 1,
    },
  })
);
