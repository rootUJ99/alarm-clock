import {useEffect, useState} from 'react';
import './App.css';

const alramTicksArr = [...new Array(60)].map((it, index) => index );
const hourArr = [...new Array(24)].map((it, index) => index+1 );


const  App = () => {
  const [currDateTime, setCurrDateTime] = useState(new Date());
  const [alramDateTime, setAlramDateTime] = useState(null);
  const [clockForm, setClockForm] = useState({ hour: 1, minute: 0, second: 0 });

  useEffect(() => {
    const TimerId = setInterval(() => {
      setCurrDateTime(new Date());
    }, 1000);
    if (alramDateTime && (currDateTime.toLocaleTimeString() === alramDateTime.toLocaleTimeString())) {
        console.log('tick tick');
        console.log(currDateTime.getTime(), alramDateTime.getTime());

      }
    return () => {
      clearInterval(TimerId)
    }
  },[alramDateTime, currDateTime]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(clockForm);
    const date = new Date();
    date.setHours(Number(clockForm.hour))
    date.setMinutes(Number(clockForm.minute))
    date.setSeconds(Number(clockForm.second))

    setAlramDateTime(
          new Date(date)
    );

  }

  const handleChange = (e) => {
    setClockForm({
      ...clockForm,
      [e.target.name]:e.target.value
    });
  }

  return (
    <div className="App">
      {currDateTime.toLocaleTimeString()}
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
        {alramTicksArr.map(it=> (<option 
          key={it} 
          value={it}> 
             {it}
          </option>)
        )}
      </select>
      <select value={clockForm.second} name='second' onChange={handleChange}>
        {alramTicksArr.map(it=> (<option 
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
      {alramDateTime && alramDateTime.toLocaleTimeString()}
    </div>
  );
}

export default App;
