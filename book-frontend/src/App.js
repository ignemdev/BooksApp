import './App.css';

import { Home } from './components/home/Home';
import { Book } from './components/books/Book';
import { Navigation } from './components/partials/Navigation';


import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main className="container">
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/books' component={Book} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
