import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Users from './components/Users';
import Login from './components/Login';
import Signup from './components/Signup';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import NoteState from './context/notes/NotesState';

function App() {
  return (
   <>
   <NoteState>
   <Router>
   <Navbar/>
   <Routes>
     <Route exact path="/" element={
        <Home/>
     }/>
      
    
     <Route exact path="/about" element={
        <About/>
     }/>
      
     <Route exact path="/user" element={
      <Users/>
     }/>
      
      <Route exact path="/login" element={
      <Login/>
     }/>
      
      <Route exact path="/signup" element={
      <Signup/>
     }/>
       
     
   </Routes>

   </Router>
   </NoteState>
   
   

   </>
  );
}

export default App;
