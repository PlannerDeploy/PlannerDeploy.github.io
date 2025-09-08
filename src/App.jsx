import { useState } from "react";
import { Calendar } from "./components/Calendar";
import { DayView } from "./components/DayView";

export function App() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <div className="app">
            <h2>Планер масажів</h2>
            <div>
                {selectedDate ? (
                    <DayView date={selectedDate} onBack={() => setSelectedDate(null)} />
                ) : (
                    <Calendar
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        onDayClick={setSelectedDate}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
