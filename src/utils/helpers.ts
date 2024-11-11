export const getFormattedDate = (givenDate: Date | string) => {
    if (typeof givenDate === "string") {
        givenDate = new Date(givenDate);
    }
    if (givenDate == null) {
        return;
    }
    const date = new Date(givenDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    let suffix;

    // Determine the suffix for the day (st, nd, rd, or th)
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    } else {
        suffix = 'th';
    }

    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the hours and minutes with leading zeros if necessary
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Construct the formatted date string
    let formattedDate = `${month} ${day}${suffix}, ${year}`;
    
    // Append time only if hours and minutes are not both zero
    if (!(hours === 0 && minutes === 0)) {
        formattedDate += ` ${formattedHours}:${formattedMinutes}`;
    }

    return formattedDate;
};
