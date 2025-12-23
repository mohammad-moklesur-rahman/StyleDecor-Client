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
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Today's Schedule
      </h1>

      {schedule.length === 0 && (
        <p className="text-gray-500 text-center md:text-left">
          No work scheduled for today.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedule.map((job) => (
          <div
            key={job._id}
            className="border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 bg-white"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
              {job.service_name}
            </h2>
            <p className="text-sm sm:text-base">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-sm sm:text-base">
              <strong>📅 Date:</strong> {job.booking_date}
            </p>
            <p className="mt-2 inline-block">
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs sm:text-sm">
                {job.dec_status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
