import {useEffect, useState} from 'react';
import Button from './Components/Button';
import Modal from './Components/Modal';
import Select from './Components/Select';
import { useLocalStorage } from './hooks';
import './App.css';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const minuteAndSecondArr = [...new Array(60)].map((_, index) => index );
const hourArr = [...new Array(24)].map((_, index) => index );
const audioSource = "https://actions.google.com/sounds/v1/alarms/dosimeter_alarm.ogg"; 


const  App = () => {

  const [currDateTime, setCurrDateTime] = useState(new Date().toLocaleTimeString());
  const [alarmDateTimeArr, setAlarmDateTimeArr] = useLocalStorage('alarmTimeArr', []);
  const [clockForm, setClockForm] = useState({ hour: 0, minute: 0, second: 0 });
  const [playAlarm, setPlayAlarm] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    const date = new Date();
    const TimerId = setInterval(() => {
      setCurrDateTime(date.toLocaleTimeString());
    }, 1000);
    if (alarmDateTimeArr?.some(it=>it?.time === currDateTime && it?.days.includes(days[date.getDay()]))) {
      console.log('tick tick');
      setPlayAlarm(true);
    }
    return () => {
      clearInterval(TimerId)
    }
  },[currDateTime, playAlarm, alarmDateTimeArr ]);


  const uniqueAlarmDateTimeArr = (dateTimeArr) => {
   return dateTimeArr.reduce((acc, curr)=> {
      if (!acc.some(it => it.time === curr.time)) {
        acc.push(curr);
      }
      return acc;
    }, []);  
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    date.setHours(Number(clockForm.hour))
    date.setMinutes(Number(clockForm.minute))
    date.setSeconds(Number(clockForm.second))
    const dateTimeString = new Date(date).toLocaleTimeString();
    let timeArr = [...alarmDateTimeArr];
    if (edit) {
    timeArr = alarmDateTimeArr.filter(it => it?.time !== edit.time);
    }
    timeArr = uniqueAlarmDateTimeArr([...timeArr, {
      time: dateTimeString,
      days: selectedDays,
    }]);
    setAlarmDateTimeArr(timeArr);
    handleShowHideModal();
  }

  const handleChange = (e) => {
    setClockForm({
      ...clockForm,
      [e.target.name]:e.target.value
    });
  }

  const handleShowHideModal = () => {
    setVisibleModal(!visibleModal);
  }
  const handleDeleteAlarm = (selectedItem) => { 
    const itemsToBeDeleted = alarmDateTimeArr.filter(it => it?.time !== selectedItem.time);
    setAlarmDateTimeArr(itemsToBeDeleted) 
  }

  const handleEditAlarm = (selectedItem) => {
    setEdit(selectedItem);
    setVisibleModal(true);
    const [hour, minute, second] = selectedItem?.time?.split(':');
    setClockForm({
      hour: Number(hour),
      minute: Number(minute),
      second: Number(second),
    });
    setSelectedDays(selectedItem.days);
  }

  const handleDayClick = (it) => {
    selectedDays.includes(it) 
    ?
    setSelectedDays(
        selectedDays.filter(item=> it !== item)
      )
    : 
    setSelectedDays([
      ...new Set([
      ...selectedDays,
        it,
      ])
    ]);
  }
  const handleSetAlarm = () => {
    setSelectedDays(days);
    setEdit(null);
    handleShowHideModal()
  }
  return (
    <div className="App">
    <div className="clock">{currDateTime}</div>
    <div className="flex-evenly">
    <Button onClick={handleSetAlarm}>Set Alarm</Button>
        { playAlarm && <Button onClick={()=>{
          setPlayAlarm(false);
        }}>Stop Alarm</Button>
        }
    </div>
      {alarmDateTimeArr.map(it=>(
      <div key={it.time} className="grid-between">
        <div className="list-clock">{it.time}</div>
        <Button onClick={()=> handleEditAlarm(it)}>Edit</Button> 
        <Button onClick={()=> handleDeleteAlarm(it)}>Delete</Button>
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
        <div className="flex-evenly">
            {days.map(it=>(
                <Button key={it} onClick={()=>handleDayClick(it)} style={{
                  background: selectedDays.includes(it) ? 'green' : 'gray'
                }}>{it}</Button>
                ))}
        </div>
      </Modal>
    </div>
  );
}

export default App;
