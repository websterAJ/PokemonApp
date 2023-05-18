import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from '../NotFound/NotFound';
import Home from '../Home/Home';
import Detail from '../Detail/Detail';
import Form from '../Form/Form';
import Welcome from '../Welcome/Welcome';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/details/:id' element={<Detail />} />
          <Route path='/create-pokemon/' element={<Form />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
