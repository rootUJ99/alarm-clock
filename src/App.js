import {useEffect, useState} from 'react';
import './App.css';

const alramTicksArr = [...new Array(60)].map((it, index) => index + 1);

const  App = () => {
  const [currDateTime, setCurrDateTime] = useState(new Date());
  const [alramDateTime, setAlramDateTime] = useState();

  useEffect(() => {
    const TimerId = setInterval(() => {
      setCurrDateTime(new Date());
      if (alramDateTime && currDateTime === alramDateTime) {
        console.log('tick tick');
      }
    }, 1000);

    return () => {
      clearInterval(TimerId)
    }
  },[currDateTime, alramDateTime]);

  return (
    <div className="App">
      {currDateTime.toLocaleTimeString()}
      {alramDateTime && alramDateTime.toLocaleTimeString()}
    <select>
      {alramTicksArr.map(it=> (<option 
        key={it} 
        value={it}> 
           {it}
        </option>)
      )}
    </select>
    <select>
      {alramTicksArr.map(it=> (<option 
        key={it} 
        value={it}> 
           {it}
        </option>)
      )}
    </select>
    <select>
      {alramTicksArr.map(it=> (<option 
        key={it} 
        value={it}> 
           {it}
        </option>)
      )}
    </select>
      <button onClick={()=>{
        const date = new Date();
        setAlramDateTime(
          new Date(date.setMinutes(date.getMinutes() + 2))
        );
      }}>
      SetAlram
    </button>
    </div>
  );
}

export default App;

