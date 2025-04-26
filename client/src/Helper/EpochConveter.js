import dayjs from 'dayjs';


export const epochConveter =(date)=>{
  let epoch = Math.floor(date.getTime()/1000)
  return epoch
} 

export const convertUnixTimestampToDate = (timestamp) => {
  // Convert Unix timestamp to milliseconds by multiplying by 1000
  const milliseconds = timestamp * 1000;
  // Create a new Date object using the milliseconds
  const dateObject = new Date(milliseconds);
  // Get the individual components of the date (year, month, day)
  const year = dateObject.getFullYear().toString().slice(-2); // Extract last two digits of the year
  const month = ('0' + (dateObject.getMonth() + 1)).slice(-2); // Month is zero-based, so add 1
  const day = ('0' + dateObject.getDate()).slice(-2);
  // Concatenate the components to form the desired date format
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const epochInDDMMYY = (epochTime) => {
  return dayjs.unix(epochTime);
}
export const jsDateIntoDayjsDate = (dateString)=>{
  return dayjs(dateString).format("DD-MM-YYYY")
}
export const currentFinancialYear = (date) => {
  const currentDate = new Date(date);
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns month index (0-11)

  let startYear = currentDate.getFullYear();
  let endYear = startYear + 1;

  if (currentMonth < 4) {
    startYear -= 1;
    endYear -= 1;
  }

  return `${startYear.toString().slice(-2)}-${endYear.toString().slice(-2)}`;
};


export function getPeriodRange(period) {
    const now = new Date();
    let startOfPeriod, endOfPeriod;
    const toIST = (date) => {
      const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in ms
      return new Date(date.getTime() + istOffset);
  };

    switch (period) {
        case "this_month":
            startOfPeriod = new Date(now.getFullYear(), now.getMonth(), 1);
            endOfPeriod = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
            );
            break;

        case "last_month":
            startOfPeriod = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endOfPeriod = new Date(
                now.getFullYear(),
                now.getMonth(),
                0,
                23,
                59,
                59,
                999
            );
            break;

        case "this_week":
            {
                const day = now.getDay(); // Sunday = 0
                const diffToMonday = (day + 6) % 7;
                startOfPeriod = new Date(now);
                startOfPeriod.setDate(now.getDate() - diffToMonday);
                startOfPeriod.setHours(0, 0, 0, 0);

                endOfPeriod = new Date(startOfPeriod);
                endOfPeriod.setDate(startOfPeriod.getDate() + 6);
                endOfPeriod.setHours(23, 59, 59, 999);
            }
            break;

        case "last_week":
            {
                const day = now.getDay();
                const diffToMonday = (day + 6) % 7;
                const lastWeekStart = new Date(now);
                lastWeekStart.setDate(now.getDate() - diffToMonday - 7);
                lastWeekStart.setHours(0, 0, 0, 0);

                const lastWeekEnd = new Date(lastWeekStart);
                lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
                lastWeekEnd.setHours(23, 59, 59, 999);

                startOfPeriod = lastWeekStart;
                endOfPeriod = lastWeekEnd;
            }
            break;

        case "today":
            startOfPeriod = new Date(now);
            startOfPeriod.setHours(0, 0, 0, 0);
            endOfPeriod = new Date(now);
            endOfPeriod.setHours(23, 59, 59, 999);
            break;

        case "yesterday":
            startOfPeriod = new Date(now);
            startOfPeriod.setDate(now.getDate() - 1);
            startOfPeriod.setHours(0, 0, 0, 0);
            endOfPeriod = new Date(startOfPeriod);
            endOfPeriod.setHours(23, 59, 59, 999);
            break;

        case "last_three_month":
            startOfPeriod = new Date(now.getFullYear(), now.getMonth() - 3, 1);
            endOfPeriod = new Date(
                now.getFullYear(),
                now.getMonth(),
                0,
                23,
                59,
                59,
                999
            );
            break;

        case "last_six_month":
            startOfPeriod = new Date(now.getFullYear(), now.getMonth() - 6, 1);
            endOfPeriod = new Date(
                now.getFullYear(),
                now.getMonth(),
                0,
                23,
                59,
                59,
                999
            );
            break;

        case "this_year":
            startOfPeriod = new Date(now.getFullYear(), 0, 1);
            endOfPeriod = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
            break;

        case "previous_year":
            startOfPeriod = new Date(now.getFullYear() - 1, 0, 1);
            endOfPeriod = new Date(
                now.getFullYear() - 1,
                11,
                31,
                23,
                59,
                59,
                999
            );
            break;

        default:
            throw new Error("Invalid period specified");
    }

    return {
        startOfPeriod: toIST(startOfPeriod),
        endOfPeriod: toIST(endOfPeriod),
    };
}

export function localDateString(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en-IN', { month: 'short', timeZone: 'UTC' });
    const year = date.getUTCFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
