import './App.css'
import { Routes,Route } from 'react-router-dom'
import { useState} from "react";
import Error404 from './views/Error404'
import LoginPass from './views/LoginPass'
import MainPage from './views/MainPage'
import TicketPage from './views/TicketPage'
import UserContext from './contexts/UserContext';
import EventPage from './views/EventPage';

// const history = createBrowserHistory()

function App() {
  const [inputValue, setInputField] = useState({
    login: '',
    password: '',
    name: '',
  })

  return (
    <Routes >
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<LoginPass inputValue={inputValue} setInputField={setInputField}/>} />
      <Route path="/main-page" element={<MainPage />} />
      <Route path="/event-page" element={<UserContext.Provider value={inputValue}><EventPage inputValue={inputValue} setInputField={setInputField} /></UserContext.Provider>} />
      <Route path="/ticket-page" element={<TicketPage />} />
    </Routes>
  )
}

export default App

