import React from 'react';
import './Character.css';

export default function Character({ character }) {
  const isTall = Number(character.height) > 176;

  return <div className={`character ${isTall && 'tall'}`}>
    <div>{character.name}</div>
    <div>{character.height / 100} m</div>
  </div>;
}
