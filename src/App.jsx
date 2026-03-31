import Home from './pages/Home/Home';
import Result from './pages/Result/Result';

import { BrowserRouter } from 'react-router';
import '/src/App.css'; 


function App(){
  return(
    <>
      <BrowserRouter>
        <Home />
        {/* <Result /> */}
      </BrowserRouter>
    </>
  );
}
export default App;
