import { Provider } from "react-redux";
import "./App.css";
import { AppRouter } from "./routes/app-route";
import axios from "axios";
import { environment } from "./environments/environment";
import { store } from "./store";

axios.defaults.baseURL = `${environment.apiPort}`;
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

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
