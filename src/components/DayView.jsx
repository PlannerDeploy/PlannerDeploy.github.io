import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Entry } from "../models/Entry";

export function DayView({ date, onBack }) {
    const [entries, setEntries] = useState([]);
    const [formState, setFormState] = useState({ customerName: "", startTime: "", endTime: "" });
    const [duration, setDuration] = useState(null); // тривалість у хвилинах

    const fetchEntries = async () => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const { data } = await supabase
            .from("entry")
            .select("*")
            .gte("start_time", startOfDay.toISOString())
            .lte("end_time", endOfDay.toISOString())
            .order("start_time");

        if (data) setEntries(data);
    };

    useEffect(() => {
        fetchEntries();
    }, [date]);

    const handleAdd = async () => {
        const { customerName, startTime, endTime } = formState;
        if (!customerName || !startTime || !endTime) return;

        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        const startDateTime = new Date(date);
        startDateTime.setHours(startHour, startMinute, 0, 0);

        const endDateTime = new Date(date);
        endDateTime.setHours(endHour, endMinute, 0, 0);

        const entry = new Entry(customerName, startDateTime.toISOString(), endDateTime.toISOString());
        await supabase.from("entry").insert([entry.toRecord()]);

        setFormState({ customerName: "", startTime: "", endTime: "" });
        setDuration(null);

        fetchEntries();
    };

    const handleChange = (field) => (e) => {
        setFormState((prev) => ({ ...prev, [field]: e.target.value }));

        if (field === "startTime" && duration) {
            const [startHour, startMinute] = e.target.value.split(":").map(Number);
            const startDateTime = new Date(date);
            startDateTime.setHours(startHour, startMinute, 0, 0);

            const endDateTime = new Date(startDateTime);
            endDateTime.setMinutes(startDateTime.getMinutes() + duration);

            const hours = endDateTime.getHours().toString().padStart(2, "0");
            const mins = endDateTime.getMinutes().toString().padStart(2, "0");

            setFormState((prev) => ({ ...prev, endTime: `${hours}:${mins}` }));
        }
    };

    const handleSelectDuration = (minutes) => {
        setDuration(minutes);

        if (formState.startTime) {
            const [startHour, startMinute] = formState.startTime.split(":").map(Number);
            const startDateTime = new Date(date);
            startDateTime.setHours(startHour, startMinute, 0, 0);

            const endDateTime = new Date(startDateTime);
            endDateTime.setMinutes(startDateTime.getMinutes() + minutes);

            const hours = endDateTime.getHours().toString().padStart(2, "0");
            const mins = endDateTime.getMinutes().toString().padStart(2, "0");

            setFormState((prev) => ({ ...prev, endTime: `${hours}:${mins}` }));
        }
    };

    const weekdayChanger = () => {
        const dateString = date.toLocaleDateString("uk-UA", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const weekDayWithSmallFirstLetter = date.toLocaleDateString("uk-UA", {
            weekday: "long",
        });
        const bigFirstLetter = weekDayWithSmallFirstLetter.substring(0, 1).toUpperCase();
        const weekDayWithoutFirstLetter = weekDayWithSmallFirstLetter.substring(1);
        return bigFirstLetter + weekDayWithoutFirstLetter + ", " + dateString;
    };

    return (
        <div className="day-view">
            <button className="back-button" onClick={onBack}>⬅ Назад</button>
            <h2 className="day-title">{weekdayChanger()}</h2>

            <ul className="entries-list">
                {entries.map((e) => (
                    <li key={e.id} className="entry-item">
                        {e.customer_name}:{" "}
                        {new Date(e.start_time).toLocaleTimeString("uk-UA", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(e.end_time).toLocaleTimeString("uk-UA", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </li>
                ))}
            </ul>

            <h3>Ім'я клієнта</h3>
            <input
                className="entry-input"
                value={formState.customerName}
                onChange={handleChange("customerName")}
            />

            <h3>Початок масажу</h3>
            <input
                className="entry-input"
                type="time"
                value={formState.startTime}
                onChange={handleChange("startTime")}
            />

            <h3>Довжина прийому</h3>
            <div className="quick-duration-buttons">
                <button
                    type="button"
                    className={duration === 30 ? "selected" : ""}
                    onClick={() => handleSelectDuration(30)}
                >
                    30 хв
                </button>
                <button
                    type="button"
                    className={duration === 45 ? "selected" : ""}
                    onClick={() => handleSelectDuration(45)}
                >
                    45 хв
                </button>
                <button
                    type="button"
                    className={duration === 60 ? "selected" : ""}
                    onClick={() => handleSelectDuration(60)}
                >
                    60 хв
                </button>
            </div>

            <h3>Кінець масажу</h3>
            <input
                className="entry-input"
                type="time"
                value={formState.endTime}
                onChange={handleChange("endTime")}
            />
            <button className="add-button" onClick={handleAdd}>Записати</button>
        </div>
    );
}
