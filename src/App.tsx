import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import WeatherWidget from './components/WeatherWidget';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <WeatherWidget />
      </div>
    </Provider>
  );
}

export default App;
