import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCharacters } from './characterSlice';
import Character from './Character';
import './CharacterPage.css';

const CharactersPage = () => {
  const characters = useSelector(state => state.characters.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (characters == null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Characters Page</h1>

      <div className="container">
        {characters.map((c, i) => (
          <Character character={c} key={i} />
        ))}
      </div>
    </div>
  );
};

export default CharactersPage;
