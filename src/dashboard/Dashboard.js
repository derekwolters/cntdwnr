import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Countdowner from '../timer/countdowner';
import InlineEdit from "./InlineEdit";

const addZero = (value) => {
    if (String(value).length < 2)
        value = String(value).padStart(2,"0");

    return value;
}

const limiter = (defaultValue, newValue, maxNumber) => {
    if (newValue > maxNumber)
        return defaultValue;

    return newValue;
}

const daysInMonth = (month, year) => { 
    return new Date(year, month, 0).getDate(); 
} 

export const DashboardPage = (props) => {
    {/**Base timer variables */}
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const xMonth = currentDate.getMonth()+1;
    const month = (xMonth < 10 ? addZero(xMonth) : xMonth);
    const day = (currentDate.getDate() < 10 ? addZero(currentDate.getDate()) : currentDate.getDate());

    {/**Workday timer variables */}
    const workdayEndYear = year;
    const workdayEndMonth = month;
    const workdayEndDay = day;
    const workdayEndHour = '03';
    const workdayEndMinute = '00';
    console.log('currentDate'); console.log(currentDate);

    {/**Custom timer variables */}
    const [customDefaultName, setCustomName] = useState("Custom");
    const [customDefaultYear, setCustomYear] = useState(year);
    const [customDefaultMonth, setCustomMonth] = useState(month);
    const [customDefaultDay, setCustomDay] = useState(day);
    const [customDefaultHour, setCustomHour] = useState('18');
    const [customDefaultMinute, setCustomMinute] = useState('30');
    const [customDefaultPeriod, setCustomPeriod] = useState('PM');
    console.log('MONTH: '+month)
    console.log('DAY: '+day)
    return (
        <div className="container mgntop">
            {/* <h2>Cntdwnr Dashboard</h2>  */}
            <Table striped bordered hover variant="light" className="timers">
                {/**Daily timer*/}
                <thead>
                    <tr>
                        <th>Daily</th>
                        <th><Countdowner name='daily' date={`${year}-${month}-${String(parseInt(day)+1).padStart(2,"0")}T00:00:00`}/></th>
                    </tr>
                </thead>
                {/**Workday timer*/}
                <thead>
                    <tr>
                        <th>
                            Workday ends at <br/>
                            {workdayEndMonth + '.' }
                            {workdayEndDay + '.' }
                            {workdayEndYear + ' @ ' }
                            {workdayEndHour < 12 ? 
                            workdayEndHour + ':' + workdayEndMinute + ' AM':
                            workdayEndHour -'12' + ':' + workdayEndMinute + ' PM'}
                        </th>
                        <th>
                            {/* <Countdowner name='workday' date=
                            {workdayEndHour > currentDate.getHours ? 
                            `${year}-${month}-${day}T${workdayEndHour}:${workdayEndMinute}:00`:
                            `${year}-${month}-${day+1}T${workdayEndHour}:${workdayEndMinute}:00`}/>     */}
                        </th>
                    </tr>
                </thead>
                {/**Custom timer template */}
                <thead>
                    <tr>
                        <th>
                            <InlineEdit 
                            text={customDefaultName} 
                            onSetText={text => 
                            setCustomName(text)} />{' '} 
                            ends at <br/>
                            <InlineEdit 
                            text={customDefaultMonth} 
                            onSetText={text => 
                                setCustomMonth(
                                    addZero(
                                        limiter(customDefaultMonth, text, 12)))} />.
                            <InlineEdit 
                            text={customDefaultDay} 
                            onSetText={text => 
                            setCustomDay(
                                addZero(
                                    limiter(customDefaultDay, text, 
                                    daysInMonth(customDefaultMonth,customDefaultYear))))} />.
                            <InlineEdit 
                            text={customDefaultYear} 
                            onSetText={text => 
                            setCustomYear(
                                limiter(customDefaultYear, text, year+2))} />{' at '}
                            <InlineEdit 
                            text={customDefaultHour} 
                            onSetText={text => 
                            setCustomHour(
                                addZero(
                                    limiter(customDefaultHour, text, 12)))} />:
                            <InlineEdit 
                            text={customDefaultMinute} 
                            onSetText={text => 
                            setCustomMinute(
                                addZero(
                                    limiter(customDefaultMinute, text, 59)))} /> {' '}
                            <InlineEdit 
                            text={customDefaultPeriod} 
                            onSetText={text => 
                            setCustomPeriod(text)} />
                        </th>
                        <th>
                            <Countdowner 
                                name='custom' 
                                date={`${customDefaultYear}-${customDefaultMonth}-${customDefaultDay}T${customDefaultHour}:${customDefaultMinute}:00`}/>
                            
                        </th>
                    </tr>
                </thead>
            </Table>
        </div>
    )
}