import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLatestMessages, appendMessage } from './logSlice';

const defaults = ["Ich habe Durst", "Ich will nach Hause", "Ich brauch ein Bier", "Bald ist Weihnachten"];

const LogPage = () => {
  // const text = useSelector(state => state.log.text);
  const messages = useSelector(state => getLatestMessages(state));
  const dispatch = useDispatch();

  useEffect(() => {
    // Log aus dem Local Storage laden
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAppend = () => {
    const index = Math.floor( (Math.random() * defaults.length));
    dispatch(appendMessage(defaults[index]));
  }

  return (
    <div>
      <h1>Log Page</h1>

      <button onClick={handleAppend}>Neue Nachricht</button>

      <div className="container">
        <ul>
          {messages.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default LogPage;
