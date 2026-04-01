import Home from './pages/Home/Home';
import Result from './pages/Result/Result';
import { Routes,Route } from 'react-router';
import '/src/App.css'; 


function App(){
  return(
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </>
  );
}
export default App;
