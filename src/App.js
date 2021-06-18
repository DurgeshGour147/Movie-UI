import './App.css';
import PublicRoutes from './config/route/PublicRoutes';
import Auth from './modules/login/login';

function App() {
  return (
    <div className="App">
      <PublicRoutes>
        <Auth />
      </PublicRoutes>
    </div>
  );
}

export default App;
