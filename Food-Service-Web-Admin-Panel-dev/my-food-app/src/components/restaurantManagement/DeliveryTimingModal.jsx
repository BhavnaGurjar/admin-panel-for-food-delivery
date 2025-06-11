import React from "react";

const DeliveryTimingModal = ({ show, optHours, onClose }) => {
  const schedule = optHours;
  const scheduleData = [
    {
      day: "Monday",
      slots: [{ slot: "Slot 1", startTime: "10:00 AM", endTime: "10:00 PM" }],
    },
    {
      day: "Tuesday",
      slots: [
        { slot: "Slot 1", startTime: "10:00 AM", endTime: "10:00 PM" },
        { slot: "Slot 2", startTime: "11:00 AM", endTime: "11:00 PM" },
      ],
    },
    {
      day: "Saturday",
      slots: [],
    },
    {
      day: "Sunday",
      slots: [],
    },
  ];

  if (!show) return null;

  return (
    <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-88 max-w-2xl mx-4">
        {/* Header + Table */}.
        <div className="p-6">
          <h4 className="text-blue-700 font-semibold text-xl mb-4">
            Delivery Timing
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="py-3 px-4 border-b">Day</th>
                  <th className="py-3 px-4 border-b">Time Slots</th>
                  <th className="py-3 px-4 border-b">Start Time</th>
                  <th className="py-3 px-4 border-b">End Time</th>
                </tr>
              </thead>
              <tbody>
                {
                    Object.entries(schedule).map(([day, daySchedule], index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td
                            className="py-3 px-4 border-b align-center"
                            rowSpan={daySchedule.open && daySchedule.slots.length > 0 ? daySchedule.slots.length : 1}
                          >
                            {day}
                          </td>

                          {daySchedule.open && daySchedule.slots.length > 0 ? (
                            <>
                              <td className="py-3 px-4 border-b">
                                Slot 1
                              </td>
                              <td className="py-3 px-4 border-b">
                                {daySchedule.slots[0].startTime}
                              </td>
                              <td className="py-3 px-4 border-b">
                                {daySchedule.slots[0].endTime}
                              </td>
                            </>
                          ) : (
                            <td
                              colSpan="3"
                              className="py-3 px-4 border-b text-center text-red-600 font-semibold"
                            >
                              Restaurant Off
                            </td>
                          )}
                        </tr>

                        {/* Remaining slots */}
                        {daySchedule.open &&
                          daySchedule.slots.slice(1).map((slot, slotIndex) => (
                            <tr key={`${day}-${slotIndex + 1}`}>
                              <td className="py-3 px-4 border-b">Slot {slotIndex + 2}</td>
                              <td className="py-3 px-4 border-b">{slot.startTime}</td>
                              <td className="py-3 px-4 border-b">{slot.endTime}</td>
                            </tr>
                          ))}
                      </React.Fragment>
                    ))
                  }
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end rounded-b-xl">
          <button
            className="bg-white text-gray-700 border border-gray-300 rounded-full px-6 py-2 text-sm hover:bg-black-10-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTimingModal;
