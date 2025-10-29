import React, { useState, useEffect } from 'react';
import { Appointment } from '../../../types';
import { salonDataService } from '../../../services/salonData';

const DashboardCalendar: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchAppointments = async () => {
            const data = await salonDataService.getAppointments();
            setAppointments(data);
        };
        fetchAppointments();
    }, []);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanksArray = Array.from({ length: (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1) }); // Adjust for Sunday start
    const weekDays = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];

    const getAppointmentsForDay = (day: number) => {
        return appointments.filter(appt => {
            const apptDate = new Date(appt.startTime);
            return apptDate.getFullYear() === currentDate.getFullYear() &&
                   apptDate.getMonth() === currentDate.getMonth() &&
                   apptDate.getDate() === day;
        });
    };

    const changeMonth = (offset: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gold mb-6">Kalendár Rezervácií</h1>
            <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-brand-dark">&lt;</button>
                    <h2 className="text-xl font-semibold text-gold">
                        {currentDate.toLocaleString('sk-SK', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-brand-dark">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                    {weekDays.map(day => <div key={day} className="font-bold text-gold/80">{day}</div>)}
                    {blanksArray.map((_, i) => <div key={`blank-${i}`}></div>)}
                    {daysArray.map(day => {
                        const dailyAppointments = getAppointmentsForDay(day);
                        return (
                            <div key={day} className="p-2 border border-gold/10 rounded-md min-h-[80px]">
                                <span className="font-semibold">{day}</span>
                                {dailyAppointments.length > 0 && (
                                    <div className="mt-1 bg-blue-500/30 text-blue-200 text-xs rounded-full px-2 py-1">
                                        {dailyAppointments.length} {dailyAppointments.length === 1 ? 'termín' : 'termíny'}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardCalendar;