// import React from 'react';
// import { Icon } from '@material-ui/core';
import { format as dateFormat } from 'date-fns';

const numberFormat = new Intl.NumberFormat('de-DE', {
  style: 'decimal',
});

// const currencyFormat = new Intl.NumberFormat('de-DE', {
//   style: 'currency',
//   currency: 'EUR',
// });

export const formatNumber = (value: number) => numberFormat.format(value);

export const formatDate = (input: string | Date | undefined, format = 'short') => {
  if (input != null && input !== '') {
    const theDate = typeof input === 'string' ? new Date(input) : input;

    try {
      return dateFormat(theDate, format === 'short' ? 'dd.MM.' : 'dd.MM.Y');
    } catch (error) {
      // console.log('input', input, typeof input);
      return '- ungültiges Datum -';
    }
  } else {
    return '';
  }
};

export const formatSex = (sex: number) =>
  sex === 0 ? '♀' : '♂';
// export const formatSex = (sex: number) =>
  // sex === 0 ? <Icon className="fa fa-venus" /> : <Icon className="fa fa-mars" />;

export const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
