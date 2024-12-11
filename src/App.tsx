import { Provider } from 'react-redux';
import './App.css';
import { AppRouter } from './routes/app-route';
import { store } from './store/store';

function App() {
  return (
    <div>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </div>
  );
}

export default App;
