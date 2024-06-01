import React, { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import 'tailwindcss/tailwind.css';

function Routine() {
    const [routine, setRoutine] = useState([]);
    const [day, setDay] = useState('');
    const [period, setPeriod] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {
        fetchRoutine();
    }, []);

    async function fetchRoutine() {
        try {
            // Initialize Supabase client
            const supabase = createClient('https://xijeclwjgjifiqjsqyng.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpamVjbHdqZ2ppZmlxanNxeW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMzgxNzAsImV4cCI6MjAzMjgxNDE3MH0.5E-i6q2Bj5WO1hZn-oNZuXCXq9NkAAkYhveID7qbvek');

            // Fetch routine data
            let { data, error } = await supabase.from('Routine').select('*');
            if (error) throw error;

            // Sort routine data by day
            data.sort((a, b) => {
                const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri"];
                return daysOrder.indexOf(a.Day) - daysOrder.indexOf(b.Day);
            });

            setRoutine(data);
        } catch (error) {
            console.error('Error fetching routine:', error.message);
        }
    }

    async function updateRoutine() {
        try {
            // Initialize Supabase client
            const supabase = createClient('https://xijeclwjgjifiqjsqyng.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpamVjbHdqZ2ppZmlxanNxeW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMzgxNzAsImV4cCI6MjAzMjgxNDE3MH0.5E-i6q2Bj5WO1hZn-oNZuXCXq9NkAAkYhveID7qbvek');

            // Update routine data
            const updates = {};
            updates[`Period${period}`] = subject;
            const { data, error } = await supabase
                .from('Routine')
                .update(updates)
                .eq('Day', day);
            if (error) throw error;
            fetchRoutine();

            // Refetch the entire routine table and set the state
        } catch (error) {
            console.error('Error updating routine:', error.message);
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-blue-600 text-4xl font-bold mb-4">Routine</h1>
            <table className="table-auto border-collapse border w-full">
                <thead>
                <tr>
                    <th className="border px-4 py-2">Days</th>
                    <th className="border px-4 py-2">Period 1</th>
                    <th className="border px-4 py-2">Period 2</th>
                    <th className="border px-4 py-2">Period 3</th>
                    <th className="border px-4 py-2">Period 4</th>
                    <th className="border px-4 py-2">Period 5</th>
                    <th className="border px-4 py-2">Period 6</th>
                </tr>
                </thead>
                <tbody>
                {routine.map((row, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{row.Day}</td>
                        <td className="border px-4 py-2">{row.Period1}</td>
                        <td className="border px-4 py-2">{row.Period2}</td>
                        <td className="border px-4 py-2">{row.Period3}</td>
                        <td className="border px-4 py-2">{row.Period4}</td>
                        <td className="border px-4 py-2">{row.Period5}</td>
                        <td className="border px-4 py-2">{row.Period6}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Update Routine</h2>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Day"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        className="border border-gray-400 px-4 py-2 mr-2 w-1/4"
                    />
                    <input
                        type="text"
                        placeholder="Period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="border border-gray-400 px-4 py-2 mr-2 w-1/4"
                    />
                    <input
                        type="text"
                        placeholder="New Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="border border-gray-400 px-4 py-2 mr-2 w-1/4"
                    />
                    <button onClick={updateRoutine} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
                </div>
            </div>
        </div>
    );
}

export default Routine;
