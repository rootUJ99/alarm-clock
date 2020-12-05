import {useEffect, useState} from 'react';
import './App.css';

const alramTicksArr = [...new Array(60)].map((it, index) => index );
const hourArr = [...new Array(24)].map((it, index) => index );


const  App = () => {
  const [currDateTime, setCurrDateTime] = useState(new Date().toLocaleTimeString());
  const [alramDateTimeArr, setAlramDateTimeArr] = useState([]);
  const [clockForm, setClockForm] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const TimerId = setInterval(() => {
      setCurrDateTime(new Date().toLocaleTimeString());
    }, 1000);
    if (alramDateTimeArr.map(it=>it).includes(currDateTime)) {
        console.log('tick tick');
        // console.log(currDateTime.getTime(), alramDateTimeArr.getTime());
    }
    return () => {
      clearInterval(TimerId)
    }
  },[...alramDateTimeArr, currDateTime]);


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
      {alramDateTimeArr.map(it=><p>{it}</p>)}
    </div>
  );
}

export default App;
