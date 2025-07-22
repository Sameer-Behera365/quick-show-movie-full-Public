const isoTimeFormat = (dateTime) => {
    const date = new Date(dateTime);
    const localTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return localTime;
}

export default isoTimeFormat



/*
toLocaleTimeString() is a built-in JavaScript method 
that formats the time part of a Date object into a string — based on your
locale and options.


underatand this:-   This line formats the time from the date object into a nice readable string like "01:00 AM".

const localTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
});



date.toLocaleTimeString(...)
➜ Converts the time part of the date to a human-readable string based on the given settings.


'en-US'
➜ This sets the locale to U.S. English, so the format will be like HH:MM AM/PM.


The settings inside { ... } do three things:

hour: '2-digit'
➜ Makes sure the hour always shows 2 digits (e.g., 01, 09, 11).

minute: '2-digit'
➜ Makes the minutes also always 2 digits (e.g., 00, 05, 30).

hour12: true
➜ Forces the time to be in 12-hour format with AM/PM, not 24-hour format.


*/










/*  demo:- -- - >
isoTimeFormat("2025-07-26T01:00:00.000Z") ➝ "6:30 AM"    Why?  


Because "2025-07-26T01:00:00.000Z" is in UTC(  UTC stands for Coordinated Universal Time.  ), and India is 5 hours 30 minutes ahead, so:

UTC:                    01:00 AM
IST (UTC+5:30):         06:30 AM


*/