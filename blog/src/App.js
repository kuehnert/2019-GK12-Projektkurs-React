import React from 'react';
import PostList from './components/PostList'
import PostPage from './components/PostPage'
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="ui container">
      <header className="App-header">
        <h1>Mein cooles Blog</h1>
      </header>

      <BrowserRouter >
        <Route path="/" exact component={PostList} />
        <Route path="/posts/:id" component={PostPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
