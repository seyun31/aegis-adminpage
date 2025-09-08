import { Routes, Route } from 'react-router-dom';
import Home from './page/home';
import Login from './page/login';
import Event from './page/event';
import NotFound from './page/notfound';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/event' element={<Event />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;