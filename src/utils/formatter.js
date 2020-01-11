import { format } from 'date-fns';

const numberFormat = new Intl.NumberFormat('de-DE', {
  style: 'decimal',
});

// const currencyFormat = new Intl.NumberFormat('de-DE', {
//   style: 'currency',
//   currency: 'EUR',
// });

export const formatNumber = value => numberFormat.format(value);

export const formatDate = dateStr => {
  if (dateStr != null) {
    return format(new Date(dateStr), 'dd.MM.Y')
  } else {
    return ""
  }
};

export const capitalise = str => str.charAt(0).toUpperCase() + str.slice(1);
