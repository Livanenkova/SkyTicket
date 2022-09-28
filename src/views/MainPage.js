import {Link} from 'react-router-dom'
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import Header from '../components/Header';
import Footer from '../components/Footer';

export function GetEvents() {
  return [
    {
      id: 1,
      title: 'Метрополис',
      type: 'кино',
      timestamp: 1664391600000,
      place: 'Екатеринбург',
      img: 'https://upload.wikimedia.org/wikipedia/commons/7/78/1927_Boris_Bilinski_%281900-1948%29_Plakat_f%C3%BCr_den_Film_Metropolis%2C_Staatliche_Museen_zu_Berlin.jpg',
      price: 1000,
    },
    {
      id: 2,
      title: 'Реальные упыри',
      type: 'кино',
      timestamp: 1663786800000,
      place: 'Санкт-Петербург',
      img: 'https://thumbs.dfs.ivi.ru/storage37/contents/9/2/328511e629d3c1d54f615d0f5d04db.jpg',
      price: 500,
    },
    {
      id: 3,
      title: 'Пьяные',
      type: 'театр',
      timestamp: 1664650800000,
      place: 'Оренбург',
      img: 'https://snob.ru/i/indoc/8b/blog_entry_805208.jpg',
      price: 1200,
    },
    {
      id: 4,
      title: 'Губернатор',
      type: 'театр',
      timestamp: 1664726400000,
      place: 'Выборг',
      img: 'https://s1.afisha.ru/mediastorage/44/e0/71696d78d72846e2986ee259e044.jpg',
      price: 1500,
    },
    {
      id: 5,
      title: 'Kasabian',
      type: 'концерт',
      timestamp: 1664816400000,
      place: 'Оренбург',
      img: 'https://i.scdn.co/image/ab6761610000e5eba0f16c3763233f2353693803',
      price: 500,
    },
    {
      id: 6,
      title: 'Gogol Bordello',
      type: 'концерт',
      timestamp: 1664901000000,
      place: 'Оренбург',
      img: 'https://i1.sndcdn.com/artworks-3vt7IOMMzGGI81BX-qqvujA-t240x240.jpg',
      price: 500,
    },
    {
      id: 7,
      title: 'Arctic monkeys',
      type: 'концерт',
      timestamp: 1664992800000,
      place: 'Оренбург',
      img: 'https://happymag.tv/wp-content/uploads/2022/08/arctic-monkeys-870x507.jpg',
      price: 1500,
    },
    {
      id: 8,
      title: 'Мамочка',
      type: 'кино',
      timestamp: 1664992800000,
      place: 'Оренбург',
      img: 'https://www.kino-teatr.ru/art/3695/45321.jpg',
      price: 500,
    },
    {
      id: 9,
      title: 'Необратимость',
      type: 'кино',
      timestamp: 1665334800000,
      place: 'Псков',
      img: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/6db24133-aa57-4071-8c7f-d3a19eff980e/600x900',
      price: 500,
    },
    {
      id: 10,
      title: 'Бойцовский клуб',
      type: 'кино',
      timestamp: 1667322000000,
      place: 'Итальианно',
      img: 'https://upload.wikimedia.org/wikipedia/ru/thumb/8/8a/Fight_club.jpg/239px-Fight_club.jpg',
      price: 1300,
    },
  ];
}

export default function MainPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [events, setEvents] = useState(GetEvents());
  const [page, setPage] = useState(1);
  const [userSearch,setUserSearch] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const options = [
    { value: 'кино', label: 'кино' },
    { value: 'тетр', label: 'театр' },
    { value: 'концерт', label: 'концерт' },
  ];

  useEffect(() => {
    if (startDate && endDate && !selectedOption) {
      setEvents(
        GetEvents().filter(
          (obj) => obj.timestamp > Date.parse(startDate)
            && obj.timestamp < Date.parse(endDate),
        ),
      );
    }

    if (startDate && !endDate && !selectedOption) {
      setEvents(
        GetEvents().filter((obj) => obj.timestamp > Date.parse(startDate)),
      );
    }

    if (!startDate && endDate && !selectedOption) {
      setEvents(GetEvents().filter((obj) => obj.timestamp < Date.parse(endDate)));
    }

    if (!startDate && !endDate && selectedOption) {
      setEvents(GetEvents().filter((obj) => obj.type === selectedOption.value));
    }

    if (startDate && endDate && selectedOption) {
      setEvents(
        GetEvents().filter(
          (obj) => obj.timestamp > Date.parse(startDate)
            && obj.timestamp < Date.parse(endDate)
            && obj.type === selectedOption.value,
        ),
      );
    }

    if (startDate && !endDate && selectedOption) {
      setEvents(
        GetEvents().filter(
          (obj) => obj.timestamp > Date.parse(startDate)
            && obj.type === selectedOption.value,
        ),
      );
    }

    if (!startDate && endDate && selectedOption) {
      setEvents(
        GetEvents().filter(
          (obj) => obj.timestamp < Date.parse(endDate)
            && obj.type === selectedOption.value,
        ),
      );
    }
  }, [startDate, endDate, selectedOption]);


  const handleButtonClick= (e) => {
    if (userSearch !== '') {
      setEvents(GetEvents().filter((event) => event.title.match(userSearch)));
    }  else if(userSearch === '') {
      GetEvents()
    }
  }

  const handleChangeDateFilter = (setStartEndDate, date) => {
    setStartEndDate(date);
  };

  const handlePage = (e) => {
    const maxPages =  events.length / 2;
    if (e.target.value === 'nextPage' && page < maxPages) setPage(page + 1);
    else if (e.target.value === 'prevPage' && page > 1) setPage(page - 1);
  }

  function handleKeyPress(e) {
    if(e.code === 'Enter') {
      if (userSearch !== '') {
        setEvents(GetEvents().filter((event) => event.title.match(userSearch)));
      }  else if(userSearch === '') {
        GetEvents()
      }
    }
  }

  return (
  <div>
    <Header/>
      <div className="order">
      <input type="text" name="search" id="search" value={userSearch} onKeyPress={handleKeyPress} onChange={(e) => setUserSearch(e.target.value)}className="search" />
      <button type="button" onClick={handleButtonClick}>Search</button>
      <div>Поиск по дате:</div>
      <div className='date-wrapper'>
      <DatePicker selected={startDate} onChange={(date) => handleChangeDateFilter(setStartDate, date)} />
      <DatePicker selected={endDate} onChange={(date) => handleChangeDateFilter(setEndDate, date)} />
      </div>
      <div className='select-wrap'>
      <Select
        className='box'
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}/>
      </div>
    <div className='order-wrap'>
    <div>{events.map((e, i) => {
      if (i < page * 3 && i > page * 3 - 4) {
        return (
        <div className="order-detail" key={e.id} >
          
          <img
            alt="poster"
            src={e.img}
            width="200px"
            height="100px"/>
            <div>{e.type}</div>
          <div>
          <Link to={`/event-page?id=${e.id}`}>{e.title}</Link>
        </div>  
        <p>
          {new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(e.timestamp)}
        </p>
        <p>
          {new Intl.DateTimeFormat('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(e.timestamp)}
        </p>
        <p>{e.place}</p>
        </div>
        );
        }
        return false;
      })}
    </div>
    </div>
    
    <div className="clear" />
    <div>
        <button
        className='btn'
          type="button"
          value="prevPage"
          onClick={(e) => handlePage(e)}
        >
          {' '}
          Back Page
          {' '}
        </button>
        <button
        className='btn'
          type="button"
          value="nextPage"
          onClick={(e) => handlePage(e)}
        >
          {' '}
          Next page
          {' '}
        </button>
      </div>
  </div>
  <Footer/>
  </div>
  )
}