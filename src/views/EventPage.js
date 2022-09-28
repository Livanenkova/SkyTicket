/* eslint-disable no-unused-vars */
import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react';
import { GetEvents } from './MainPage';
import { TicketPage } from './TicketPage';
import UserContext from '../contexts/UserContext';
// import { Context } from '../context/useContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function EventPage(props) {
  const ref1 = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchId = searchParams.get('id');

  const [events, setEvents] = useState(GetEvents());
  const [counter, setCounter] = useState();

  const userInfo = useContext(UserContext)
  console.log(userInfo)

  // const { context, setContext } = useContext(Context);
  // console.log(context, 'email');

  useEffect(() => {
    setEvents(GetEvents().filter((obj) => obj.id === +searchId));
    setCounter(ref1.current.value);
  }, []);

  console.log(counter, 'counter');
  return (
    <div>
      <Header/>
      {events.map((e) => (
        <div key={e.id}>
          <img
          alt="poster"
          src={e.img}
          width="300px"
          height="200px"/>
          <h2>Название: {e.title}</h2>
          <div>Тип: {e.type}</div>
          <div>Дата:
            {new Intl.DateTimeFormat('ru-RU', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(e.timestamp)}
          </div>
          <p>Время:
            {new Intl.DateTimeFormat('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }).format(e.timestamp)}
          </p>
          <p>Город: {e.place}</p>
          <p>Цена: {e.price * Number(counter)}</p>
        </div>
      ))}
      <div className='form-wrapper'>
      <form action="/ticket-page">
        Name
        <input name="login" type="text" defaultValue={userInfo.login}/>
        Count
        <input
          name="ticketsCount"
          type="number"
          defaultValue="1"
          ref={ref1}
          onChange={(e) => setCounter(e.target.value)}
        />
        <input className='event-input-id' name="eventId" type="text" value={events[0].id}/>
        <input className='event-input-title' name="title" type="text" value={events[0].title}/>
        <input className='event-input-place' name="place" type="text" value={events[0].place}/>
        <input type="submit" value="Оформить" />
        
      </form>
      <div>{events[0].title}</div>
      <div>
        {new Intl.DateTimeFormat('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(events[0].timestamp)}</div>
      </div>
      <div>{events[0].place}</div>
      <Footer/>
    </div>
  );
}