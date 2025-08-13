import { zonedTimeToUtc, formatInTimeZone } from 'date-fns-tz';

// ... (rest of imports remain same)

const convertedTime = useMemo(() => {
  try {
    const utcDate = zonedTimeToUtc(dateTime, fromTz);
    return formatInTimeZone(utcDate, toTz, "yyyy-MM-dd'T'HH:mm");
  } catch {
    return 'Invalid Date';
  }
}, [dateTime, fromTz, toTz]);