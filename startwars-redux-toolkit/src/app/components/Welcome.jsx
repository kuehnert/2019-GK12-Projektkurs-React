import React from 'react'
import history from '../../history';

export default function Welcome() {
  history.push('/characters');

  return null;
}
