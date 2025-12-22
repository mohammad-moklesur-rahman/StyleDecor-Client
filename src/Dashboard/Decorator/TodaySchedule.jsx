import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TodaySchedule = () => {
  const axiosSecure = useAxiosSecure();
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/decorators/today-schedule")
      .then((res) => setSchedule(res.data));
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Today's Schedule</h1>

      {schedule.length === 0 && (
        <p className="text-gray-500">No work scheduled for today.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {schedule.map((job) => (
          <div key={job._id} className="border p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">{job.service_name}</h2>
            <p>Location: {job.location}</p>
            <p>📅 Date: {job.booking_date}</p>
            <p className="mt-2">
              <span className="bg-blue-200 px-2 rounded">{job.dec_status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
