import React from "react";

export function Calendar({ currentDate, setCurrentDate, onDayClick }) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

    const days = [];

    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push({
            date: new Date(year, month - 1, prevMonthDays - i),
            isCurrentMonth: false,
        });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            date: new Date(year, month, i),
            isCurrentMonth: true,
        });
    }

    while (days.length % 7 !== 0) {
        const nextDay = days.length - (firstDayOfWeek + daysInMonth) + 1;
        days.push({
            date: new Date(year, month + 1, nextDay),
            isCurrentMonth: false,
        });
    }

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={prevMonth}>◀</button>
                <span>
                    {currentDate.toLocaleString("uk-UA", {
                        month: "long",
                        year: "numeric",
                    })}
                </span>
                <button onClick={nextMonth}>▶</button>
            </div>
            <div className="calendar-grid">
                {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
                    <div key={d} className="calendar-weekday">
                        {d}
                    </div>
                ))}
                {days.map(({ date, isCurrentMonth }) => {
                    const dayOfWeek = (date.getDay() + 6) % 7; 
                    return (
                        <div
                            key={date.toISOString()}
                            className={`calendar-day 
                                ${isCurrentMonth ? "" : "other-month"} 
                                ${dayOfWeek >= 5 ? "weekend" : ""}`}
                            onClick={() => onDayClick(date)}
                        >
                            {date.getDate()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
