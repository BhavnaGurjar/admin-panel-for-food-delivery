const DateTime = (
  date,
  { showYear = true, showTime = true } = {}
) => {
  if (!date) return { date: "N/A", time: "N/A" };

  // Attempt to parse the date
  const parsedDate = new Date(Number(date));
  if (isNaN(parsedDate.getTime())) return { date: "N/A", time: "N/A" };

  // Format date: MM/DD or MM/DD/YYYY
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const year = parsedDate.getFullYear();
  const formattedDate = showYear ? `${month}-${day}-${year}` : `${month}-${day}`;

  // Format time: h:mm AM/PM
  let formattedTime = "N/A";
  if (showTime) {
    let hour = parsedDate.getHours();
    const minute = String(parsedDate.getMinutes()).padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    formattedTime = `${hour}:${minute} ${ampm}`;
  }

  return {
    date: formattedDate,
    time: formattedTime,
  };
};
export default DateTime;