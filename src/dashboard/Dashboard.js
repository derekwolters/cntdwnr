import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Countdowner from '../timer/countdowner';
import InlineEdit from "./InlineEdit";

export const DashboardPage = (props) => {
    const currentDate = new Date();
    const year = (currentDate.getFullYear());
    const month = (currentDate.getMonth() < 10 ? currentDate.getMonth()+'1' : currentDate.getMonth());
    const day = (currentDate.getDate());
    const workdayEndHour = '03';
    const workdayEndMinute = '00';

    const [customDefaultHour, setCustomHour] = useState('00');
    const [customDefaultMinute, setCustomMinute] = useState('00');
    const [customDefaultPeriod, setCustomPeriod] = useState('AM');
    
    return (
        <div className="container mgntop">
            {/* <h2>Cntdwnr Dashboard</h2>  */}
            <Table striped bordered hover variant="light" className="timers">
                <thead>
                    <tr>
                        <th>Daily</th>
                        {console.log('year:')}
                        {console.log(year)}
                        {console.log('month:')}
                        {console.log(month)}
                        {console.log('day:')}
                        {console.log(day)}
                        <th><Countdowner date={`${year}-${month}-${day+1}T00:00:00`}/></th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Workday ends at <br/>
                            {workdayEndHour < 12 ? 
                            workdayEndHour + ':' + workdayEndMinute + ' AM':
                            workdayEndHour -'12' + ':' + workdayEndMinute + ' PM'}
                        </th>
                        <th><Countdowner date=
                            {workdayEndHour > currentDate.getHours ? 
                            `${year}-${month}-${day}T${workdayEndHour}:${workdayEndMinute}:00`:
                            `${year}-${month}-${day+1}T${workdayEndHour}:${workdayEndMinute}:00`}/>    
                        </th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Custom ends at <br/>
                            <InlineEdit text={customDefaultHour} onSetText={text => setCustomHour(text)} />:
                            <InlineEdit text={customDefaultMinute} onSetText={text => setCustomMinute(text)} />{' '}
                            <InlineEdit text={customDefaultPeriod} onSetText={text => setCustomPeriod(text)} />
                        </th>
                        <th><Countdowner date=
                            {customDefaultHour > currentDate.getHours ? 
                                `${year}-${month}-${day}T${customDefaultHour}:${workdayEndMinute}:00`:
                                `${year}-${month}-${day+1}T${customDefaultHour}:${workdayEndMinute}:00`}/></th>
                    </tr>
                </thead>
            </Table>
        </div>
    )
}