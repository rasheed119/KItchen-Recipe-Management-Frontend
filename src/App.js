import './App.css';
import { Routes,Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Createrecipe from './Pages/Create-recipe';
import SavedRecipe from './Pages/SavedRecipe';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import '@fontsource/roboto/300.css';


function App() {
  return (
      <Routes>
        
        <Route path='/' element={<Homepage/>} />

        <Route path='/recipe' element={<Createrecipe/>} />

        <Route path='/saved' element={<SavedRecipe/>} />

        <Route path='/auth' element={<Login/>} />

        <Route path='/register' element={<Register/>} />

      </Routes>
  );
}

export default App;
