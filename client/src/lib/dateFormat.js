import React from 'react'


export const dateFormat = (date) => {
    return new Date(date).toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}


/*


import React from 'react'

const dateFormat = (date) => {
    return new Date(date).toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}


export default dateFormat






u can do like thsi also but iu  enend to import it in default way not named way




















Step-by-step:--------------------->

new Date(date)
This takes your input (which can be a date string like "2025-07-25T10:30:00" or a timestamp) and converts it into a JavaScript Date object.
This object knows the year, month, day, hour, minute, and second in a structured way.




.toLocaleString('en-US', {...})
This method converts the date into a human-readable text format.
'en-US' tells JavaScript to use U.S. English formatting style (for example, months will be in English, times will default to 12-hour format with AM/PM).



Formatting options:
weekday: 'short' → shows the weekday abbreviation (e.g., Mon, Tue).
month: 'long' → shows the full month name (e.g., July).
day: 'numeric' → shows the day number (e.g., 25).
hour: 'numeric' → shows the hour (e.g., 3 or 15 depending on locale settings).
minute: 'numeric' → shows the minutes (e.g., 45).



Result example:
If date = "2025-07-25T15:45:00", the output will be:
"Fri, July 25, 3:45 PM" (formatted for U.S. English).

*/