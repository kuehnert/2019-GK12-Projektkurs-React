import { format as dateFormat } from 'date-fns';
import { de } from 'date-fns/locale';

const numberFormat = new Intl.NumberFormat('de-DE', {
  style: 'decimal',
});

const dateFormats: { [key: string]: string } = {
  withWeekday: 'EEE, dd.MM.',
  long: 'dd.MM.Y',
  short: 'dd.MM.',
};

export const formatBoolean = (value: boolean) => (value ? '✔' : '❌');

export const formatNumber = (value: number) => numberFormat.format(value);

export const formatDate = (input: string | Date | undefined, format = 'short') => {
  if (input != null && input !== '') {
    const theDate = typeof input === 'string' ? new Date(input) : input;

    try {
      return dateFormat(theDate, dateFormats[format], { locale: de });
    } catch (error) {
      return '- ungültiges Datum -';
    }
  } else {
    return '';
  }
};

export const formatSex = (sex: number) => (sex === 0 ? '♀' : '♂');

export const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
