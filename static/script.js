function setZoom() {
	document.body.style.zoom = ""+window.innerHeight/7.3+"%";
}
window.onload = setZoom;

function formatTimeDate(timedate) {
    const year = timedate.getFullYear();
    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    const month = monthNames[timedate.getMonth()];
    const day = String(timedate.getDate());
    let hours = timedate.getHours();
    const minutes = String(timedate.getMinutes());
    let ampm = "AM";
    if (hours >= 12) {
        ampm = "PM";
        hours %= 12;
    }
    if (hours === 0) {
        hours = 12; 
    }

    return `${hours}:${minutes} ${ampm} | ${month} ${day} ${year}`;
}

function updateTimeDate() {
    const now = new Date();
    const formattedTimeDate = formatTimeDate(now);
    document.getElementById("timedate").textContent = formattedTimeDate;
}

updateTimeDate();
setInterval(updateTimeDate, 1000);