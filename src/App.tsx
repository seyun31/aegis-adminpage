import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Event from './page/Event';
import NotFound from './page/NotFound';

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