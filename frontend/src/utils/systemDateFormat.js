import { format } from 'date-fns';

import { SYSTEM_DATE_FORMAT } from '../globals';

export default function systemDateFormat(dateInput = '', dateFormat = SYSTEM_DATE_FORMAT) {
  try {
    if (!dateInput) return '';

    const date = new Date(dateInput);
    const invalidDate = isNaN(date.getTime());

    if (invalidDate) return '';

    return format(date, dateFormat);
  } catch {
    return '';
  }
}
