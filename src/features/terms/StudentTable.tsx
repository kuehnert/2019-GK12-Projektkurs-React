import { Link, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { formatDate } from '../../utils/formatter';
import { getTermStudents } from '../courses/studentSlice';

interface Props {
  termId: string;
}

const columns = [
  { title: 'Klasse/Stufe', field: 'formGroup' },
  { title: 'Nachname', field: 'lastname' },
  { title: 'Vorname', field: 'firstname' },
  { title: 'Geschlecht', field: 'sex', lookup: { 0: '♀', 1: '♂' } },
];

export default ({ termId }: Props) => {
  const students = useSelector((state: RootState) => state.students.students[termId] || []).map(s => ({ ...s }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTermStudents(termId));
  }, [dispatch, termId]);

  return (
    <MaterialTable
      title="Schülerinnen und Schüler"
      options={{
        filtering: true,
        pageSize: 20,
        pageSizeOptions: [10, 20, 30, 50],
        padding: 'dense',
      }}
      columns={columns}
      data={students}
      detailPanel={rowData => {
        return (
          <Paper
            style={{
              fontSize: '1rem',
              textAlign: 'center',
              color: 'white',
              backgroundColor: '#43A047',
            }}>
            {rowData.firstname} {rowData.lastname}
            <br />
            Geboren am {formatDate(rowData.dob, 'long')}
            <br />
            <Link href={`tel://${rowData.phone}`}>{rowData.phone}</Link> | <Link href={`mailto:${rowData.email}`}>{rowData.email}</Link>}
          </Paper>
        );
      }}
    />
  );
};
