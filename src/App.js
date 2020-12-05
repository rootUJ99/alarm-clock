import {useEffect, useState} from 'react';
import './App.css';

const minuteAndSecondArr = [...new Array(60)].map((it, index) => index );
const hourArr = [...new Array(24)].map((it, index) => index );


const  App = () => {
  const [currDateTime, setCurrDateTime] = useState(new Date().toLocaleTimeString());
  const [alramDateTimeArr, setAlramDateTimeArr] = useState([]);
  const [clockForm, setClockForm] = useState({ hour: 0, minute: 0, second: 0 });
  const [playAlarm, setPlayAlarm] = useState(false);

  useEffect(() => {
    const TimerId = setInterval(() => {
      setCurrDateTime(new Date().toLocaleTimeString());
    }, 1000);
    if (alramDateTimeArr.map(it=>it).includes(currDateTime)) {
      console.log('tick tick');
      setPlayAlarm(true);
    }
    return () => {
      clearInterval(TimerId)
    }
  },[currDateTime, playAlarm]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(clockForm);
    const date = new Date();
    date.setHours(Number(clockForm.hour))
    date.setMinutes(Number(clockForm.minute))
    date.setSeconds(Number(clockForm.second))

    setAlramDateTimeArr([
      ...new Set([
        ...alramDateTimeArr,
        new Date(date).toLocaleTimeString(),
      ])
    ]);

  }

  const handleChange = (e) => {
    setClockForm({
      ...clockForm,
      [e.target.name]:e.target.value
    });
  }

  return (
    <div className="App">
      {currDateTime}
    <form onSubmit={handleSubmit}>
      <select value={clockForm.hour} name='hour' onChange={handleChange}>
        {hourArr.map(it=> (<option 
          key={it} 
          value={it}> 
             {it}
          </option>)
        )}
      </select>
      <select value={clockForm.minute} name='minute' onChange={handleChange}>
        {minuteAndSecondArr.map(it=> (<option 
          key={it} 
          value={it}> 
             {it}
          </option>)
        )}
      </select>
      <select value={clockForm.second} name='second' onChange={handleChange}>
        {minuteAndSecondArr.map(it=> (<option 
          key={it} 
          value={it}> 
             {it}
          </option>)
        )}
      </select>
        <button type="submit"> 
        SetAlram
      </button>
    </form>
      {alramDateTimeArr.map(it=>(
      <div key={it}>
        {it} <button onClick={()=>{            
          setAlramDateTimeArr(alramDateTimeArr.filter(fit => fit!== it));
        }}>delete alarm</button>
      </div>
          ))}
        { playAlarm && <audio controls hidden autoPlay={playAlarm} loop src="https://actions.google.com/sounds/v1/alarms/dosimeter_alarm.ogg" /> } 
        { playAlarm && <button onClick={()=>{
          setPlayAlarm(false);
        }}>stop alarm</button>
        }
    </div>
  );
}

export default App;
