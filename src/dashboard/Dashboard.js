import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Countdowner from '../timer/countdowner';
import InlineEdit from "./InlineEdit";

export const DashboardPage = (props) => {
    const currentDate = new Date();
    const year = (currentDate.getFullYear());
    const month = (currentDate.getMonth() < 10 ? currentDate.getMonth()+'1' : currentDate.getMonth());
    const day = (currentDate.getDate());
    const workdayEndYear = year;
    const workdayEndMonth = month;
    const workdayEndDay = day;
    const workdayEndHour = '03';
    const workdayEndMinute = '00';

    const [customDefaultName, setCustomName] = useState("Custom");
    const [customDefaultYear, setCustomYear] = useState(year);
    const [customDefaultMonth, setCustomMonth] = useState(month);
    const [customDefaultDay, setCustomDay] = useState(day);
    const [customDefaultHour, setCustomHour] = useState('21');
    const [customDefaultMinute, setCustomMinute] = useState('00');
    const [customDefaultPeriod, setCustomPeriod] = useState('AM');
    
    return (
        <div className="container mgntop">
            {/* <h2>Cntdwnr Dashboard</h2>  */}
            <Table striped bordered hover variant="light" className="timers">
                <thead>
                    <tr>
                        <th>Daily</th>
                        <th><Countdowner date={`${year}-${month}-${day+1}T00:00:00`}/></th>
                    </tr>
                </thead>
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
                            <Countdowner date=
                            {workdayEndHour > currentDate.getHours ? 
                            `${year}-${month}-${day}T${workdayEndHour}:${workdayEndMinute}:00`:
                            `${year}-${month}-${day+1}T${workdayEndHour}:${workdayEndMinute}:00`}/>    
                        </th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>
                            <InlineEdit text={customDefaultName} onSetText={text => setCustomName(text)} />     {' '} 
                            ends at <br/>
                            <InlineEdit text={customDefaultMonth} onSetText={text => setCustomMonth(text)} />   .
                            <InlineEdit text={customDefaultDay} onSetText={text => setCustomDay(text)} />       .
                            <InlineEdit text={customDefaultYear} onSetText={text => setCustomYear(text)} />     {' @ '}
                            <InlineEdit text={customDefaultHour} onSetText={text => setCustomHour(text)} />     :
                            <InlineEdit text={customDefaultMinute} onSetText={text => setCustomMinute(text)} /> {' '}
                            <InlineEdit text={customDefaultPeriod} onSetText={text => setCustomPeriod(text)} />
                        </th>
                        <th>
                            <Countdowner date= {`${customDefaultYear}-${customDefaultMonth}-${customDefaultDay}T${customDefaultHour}:${customDefaultMinute}:00`}/>
                            
                        </th>
                    </tr>
                </thead>
            </Table>
        </div>
    )
}