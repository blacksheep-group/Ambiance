function formatDateTime(date) {
    const year = date.getFullYear();
    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate());
    let hours = date.getHours();
    const minutes = String(date.getMinutes());
    const seconds = String(date.getSeconds());
    let ampm = "AM";
    if (hours >= 12) {
        ampm = "PM";
        hours %= 12;
    }
    if (hours === 0) {
        hours = 12; 
    }

    return `${hours}:${minutes}:${seconds} ${ampm} | ${month} ${day} ${year}`;
}

  function updateTimeDate() {
      const now = new Date();
      const formattedTime = formatDateTime(now);
      document.getElementById("timedate").textContent = formattedTime;
  }

  updateTimeDate();
  setInterval(updateTimeDate, 1000);