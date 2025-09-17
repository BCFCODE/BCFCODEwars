import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Register plugins globally once
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

// Set default timezone if needed (optional)
// dayjs.tz.setDefault("UTC")

export default dayjs;
