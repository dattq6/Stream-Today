export const calculateHoursAgo = (publishedDate: string): string => {
    const now = new Date();
    const publishedTime = new Date(publishedDate);
    const hoursAgo = Math.floor(
        (now.getTime() - publishedTime.getTime()) / (1000 * 60 * 60),
    );
    return `${hoursAgo} hours ago`;
};

export const calculateTimeRemaining = (eventDate: string): string => {
    const now = new Date();
    const eventTime = new Date(eventDate);

    // Calculate the difference in milliseconds
    const diffInMilliseconds = eventTime.getTime() - now.getTime();

    // Convert milliseconds to hours
    let diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

    // Calculate weeks, days, and hours
    const weeks = Math.floor(diffInHours / (24 * 7));
    diffInHours %= 24 * 7; // Remaining hours after weeks

    const days = Math.floor(diffInHours / 24);
    const hours = diffInHours % 24; // Remaining hours after days

    // Create a formatted string based on the remaining time
    if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
};


export const formatDate = (eventDate: string): string => {
    const now = new Date();
    const date = new Date(eventDate);

    // Calculate the difference in milliseconds
    const diffInMilliseconds = date.getTime() - now.getTime();

    // Convert milliseconds to days
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    // Get components of the date
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours to 12-hour format and determine AM/PM
    const formattedHours = hours % 12 || 12; // Converts 0 to 12 for midnight hour
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // Pad month, day, and minutes with leading zeros if necessary
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // If the difference is more than 1 day, return just the date in MM-DD format
    if (diffInDays > 1) {
        return `${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes} ${amPm}`;
    }

    // Construct the formatted date string with time
    return `${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes} ${amPm}`;
};