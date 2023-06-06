import { useState, useEffect } from 'react'
import './assets/styles/namecard_style.css'
import './assets/styles/selectionwindow_style.css'
import './assets/styles/webhub_style.css'

import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'

import ToDoList from './components/modules/ToDoList'
import Calendar from './components/modules/Calendar'
import Memos from './components/modules/Memos'
import FManager from './components/modules/FManager'
import WebHub from './components/modules/WebHub'
import Settings from './components/modules/Settings'

import logo from './assets/images/WebsiteLogo.png'

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = weatherApiKey;
      const location = 'Hanam-si,kr';
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
      
      if (!response.ok) {
        console.error('Response not OK', response);
        setLoading(false);
      } else {
        const weatherData = await response.json();
        setWeather(weatherData);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!weather) return <div>Error Loading Weather</div>;

  const temperature = (weather.main.temp - 273.15).toFixed(1);

  return (
    <div className='weather-container'>
      <p className='weather'>{weather.name} | {weather.weather[0].description}</p>
      <p className='temperature'>{temperature} °C</p>
    </div>
  );
}
  
function NameCard() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
    clearInterval(timerId);
    };
  }, []);

  function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    
    return `${year}.${month}.${day}`;
  }

  return (
    <>
      <div className='namecard-background' />
      
      <img className='logo' alt='Logo' src={logo}></img>

      <div className='credit-container'>
        <p className='credit'>A website by Taehoon Hwang.</p>
      </div>
      
      <div className='date-time-container'>
        <p className='date'>{formatDate(date)}</p>
        <p className='time'>{date.toLocaleTimeString('it-IT')}</p>
      </div>

      <Weather />
    </>
  );
}

function SelectionWindow({handleModuleChange}) {
  const buttons = ['TO-DO LIST', 'CALENDAR', 'MEMO / NOTES', 'FINANCIAL MANAGER', 'WEB HUB', 'SETTINGS'];

  return (
    <>
      <div className='selectionwindow-background' />
      <div className='button-container'>
        {buttons.map((button, index) => (
          <button key={index} className='button-item' onClick={() => handleModuleChange(button)}>
            {button}
          </button>
        ))}
      </div>
    </>
  );
}

export default function Hub() {
  let displayPage = <LoginPage />;
  let displayModule = <ToDoList />;
  const [currentPage, setCurrentPage] = useState('LP');
  const [currentModule, setCurrentModule] = useState('TDL');
  const [pageUsername, setPageUsername] = useState('NA');

  switch(currentModule){
    case 'TO-DO LIST':
      displayModule = <ToDoList />;
      break;
    case 'CALENDAR':
      displayModule = <Calendar />;
      break;
    case 'MEMO / NOTES':
      displayModule = <Memos />;
      break;
    case 'FINANCIAL MANAGER':
      displayModule = <FManager />;
      break;
    case 'WEB HUB':
      displayModule = <WebHub />;
      break;
    case 'SETTINGS':
      displayModule = <Settings pageUsername={pageUsername}/>;
      break;
    default:
      break;
  }

  switch(currentPage){
    case 'LP':
      displayPage = <LoginPage setCurrentPage={setCurrentPage} setPageUsername={setPageUsername}/>;
      break;
    case 'RP':
      displayPage = <RegisterPage setCurrentPage={setCurrentPage} />;
      break;
    case 'MP':
      displayPage = <div>
                      <NameCard />
                      <SelectionWindow handleModuleChange={setCurrentModule} />
                      <div>
                        {displayModule}
                      </div>
                    </div>;
      break;
    default:
      break;
  }

  return (
    <>
      <div className='main-background'></div>
      <div>{displayPage}</div>
    </>
  );
}