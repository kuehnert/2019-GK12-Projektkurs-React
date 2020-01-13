import { Button, Box, Card, Paper, CardContent, Grid, TextField, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
// import { useCourse, useTerm } from '../../utils/selectors';
import { Term } from '../terms/termSlice';
import { Course } from './courseSlice';
import papaparse from 'papaparse';
import { parse, isValid } from 'date-fns';
import { formatDate, formatSex } from '../../utils/formatter';
import { StudentBase } from './studentSlice';

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
  'E-Mail': 'email',
};

const sampleCSV = `Nr.,Nachname,Vorname,Geschlecht,Belegung,Telefon,Alter,Geburtstag,E-Mail
1,Baller,Isabel,female,m,02174-6692347,15,25.01.2004,ISABEL@GMX.DE
2,Barrer,Jonas,male,m,02175-98234,15,01.02.2004,jonas@gmail.com
3,Bauer,Maximilian,male,s,02174-8923450,16,03.11.2003,maximilian@gmail.com
4,Berler,Eric,male,s,02175-8843261,15,30.04.2004,oberl@t-online.de
5,Moster,Andreas,male,m,02171-552348,15,31.05.2004,andre@gmail.com
6,Ottilie,Emily,female,m,0172-2234600,15,07.06.2004,emil@gmail.com
7,Passer,Simone,female,m,02171-3723443,15,04.07.2004,sim@gmail.com
8,Pesser,Giulia,female,m,02173-223445,15,26.08.2004,giu@gpx.com
9,Philler,Floris,male,m,02171-3943247947,15,19.09.2004,flo@gmail.com
10,Pitter,Luisa,female,m,02171-402344,15,13.10.2004,luis@gmail.com
11,Rösser,Alisa,female,m,02171-,15,29.11.2004,
12,Schiffer,Alexander,male,s,0214-672349,16,25.12.2003,alex@outlook.de
13,Schmickler,Selina,female,m,02173-1623417,17,03.01.2003,schmitz@freenet.de
14,Straucher,Fabian,male,s,02175-166234,15,28.02.2004,fabian@web.de
15,Tewwer,Theresa,female,m,02173-8234642,17,06.03.2002,theresa@gmail.com
16,Thaili,Marie,female,m,,,-,kasi@gmail.com
17,Webber,Tim,male,m,02175-459234,15,16.04.2004,tim@nrwfamily.de
18,Weinwer,Jana,female,m,02171-4922341,16,11.05.2003,jana@gmx.de
19,Wieser,Leon,male,s,02173-2949234,16,08.06.2003,la@gmx.de
20,Wisser,Simon,male,s,0214-203242482,16,03.07.2003,simon@t-online.de`;

export default (props: Props) => {
  const { term, course } = props;
  const [csvData, setCsvData] = useState(sampleCSV);
  const [formGroup, setFormGroup] = useState('');
  const [students, setStudents] = useState(Array<StudentBase>());
  // const dispatch = useDispatch();
  const classes = useStyles();

  // const parseCsv = (event: React.ChangeEvent<HTMLInputElement>) => {
  // setCsvData(event.target.value);
  const parseCsv = () => {
    const result = papaparse.parse(csvData.trim(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: header => headerMap[header],
      transform: (value, header) => {
        switch (header) {
          case 'dob':
            const date = parse(value, 'dd.MM.yyyy', new Date());
            return isValid(date) ? date : null;

          case 'email':
            return value.toLowerCase();

          case 'sex':
            return value === 'female' ? 0 : 1;

          default:
            return value;
        }
      },
    });

    const newStudents = result.data.map(s => ({ ...s, formGroup }));
    setStudents(newStudents);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => parseCsv(), [csvData, formGroup]);

  if (term == null || course == null) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      {/* <Typography variant="h4">Schülerdaten importieren</Typography> */}

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
        <Button variant="contained" color="primary" className={classes.button} disabled={formGroup === ''}>
          Importieren
        </Button>
      </div>

      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          {students.map((s, i) => (
            <Grid item xs={3} key={`${s.lastname},${s.firstname}`} className={classes.card}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="h5" color="primary">
                    {s.lastname}, {s.firstname} {formatSex(s.sex)}
                  </Typography>
                  <Typography variant="body1" component="p" color="secondary" className={classes.cardNumber}>
                    {i + 1}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Klasse {s.formGroup || '?'}, *{formatDate(s.dob, 'long') || '?'}
                  </Typography>
                  <Typography>
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
