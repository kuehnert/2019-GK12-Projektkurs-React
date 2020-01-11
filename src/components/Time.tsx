import React from 'react';
import { format, parseJSON } from 'date-fns';

interface Props {
  time: string;
}

const Time = ({ time }: Props) => {
  return <>{format(parseJSON(time), 'H.mm')}</>;
};

export default Time;
