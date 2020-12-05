import {useEffect, useState} from 'react';
import Button from './Components/Button';
import Modal from './Components/Modal';
import Select from './Components/Select';

import './App.css';

const minuteAndSecondArr = [...new Array(60)].map((it, index) => index );
const hourArr = [...new Array(24)].map((it, index) => index );
const audioSource = "https://actions.google.com/sounds/v1/alarms/dosimeter_alarm.ogg"; 


const  App = () => {
  const [currDateTime, setCurrDateTime] = useState(new Date().toLocaleTimeString());
  const [alramDateTimeArr, setAlramDateTimeArr] = useState([]);
  const [clockForm, setClockForm] = useState({ hour: 0, minute: 0, second: 0 });
  const [playAlarm, setPlayAlarm] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

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
    handleShowHideModal();
  }

  const handleChange = (e) => {
    setClockForm({
      ...clockForm,
      [e.target.name]:e.target.value
    });
  }

  const handleShowHideModal = () => setVisibleModal(!visibleModal);
  
  const handleDeleteAlarm = (selectedItem) => { 
    setAlramDateTimeArr(alramDateTimeArr.filter(it => it !== selectedItem)) 
  }

  const handleEditAlarm = (selectedItem) => {
    setVisibleModal(true);
    const [hour, minute, second] = selectedItem.split(':')
    setClockForm({
      hour: Number(hour),
      minute: Number(minute),
      second: Number(second),
    })
  }

  return (
    <div className="App">
    <div className="clock">{currDateTime}</div>
    <div className="flex-evenly">
    <Button onClick={handleShowHideModal}>Set Alarm</Button>
        { playAlarm && <Button onClick={()=>{
          setPlayAlarm(false);
        }}>Stop Alarm</Button>
        }
    </div>
      {alramDateTimeArr.map(it=>(
      <div key={it} className="grid-between">
        <div className="list-clock">{it}</div>
        <Button onClick={()=> handleEditAlarm(it)}>Edit</Button> 
        <Button onClick={()=>handleDeleteAlarm(it)}>Delete</Button>
      </div>
          ))}
        { playAlarm && <audio controls hidden autoPlay={playAlarm} loop src={audioSource} /> } 
      <Modal toggle={visibleModal} onClose={handleShowHideModal}>
        <form onSubmit={handleSubmit}>
          <div className="flex-evenly">
            <Select value={clockForm.hour} name='hour' onChange={handleChange} options={hourArr} /> 
            <Select value={clockForm.minute} name='minute' onChange={handleChange} options={minuteAndSecondArr} />
            <Select value={clockForm.second} name='second' onChange={handleChange} options={minuteAndSecondArr} />
              <Button type="submit"> 
              Set Alram
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;
