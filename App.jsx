import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserPage from './components/UserPage.jsx';

const App = props => {
    return (
      <div className="router">
        <main>
          {}
          <Switch>
            <Route
              exact
              path="/userPage"
              component={UserPage}
            />
          </Switch>
        </main>
      </div>
    );
  };

  
  export default App;