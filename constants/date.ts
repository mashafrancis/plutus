import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import { views } from './table';

export const dateFormat: string = 'yyyy-MM-dd';
export const datePattern: string = 'd{2}-d{2}-d{4}';

export const getRangeDateForFilter = (filter: any) => {
  const dateObj = new Date();
  if (filter === views.thisWeek?.key) {
    return [
      format(startOfWeek(dateObj), dateFormat),
      format(endOfWeek(dateObj), dateFormat),
    ];
  }
  return [
    format(startOfMonth(dateObj), dateFormat),
    format(endOfMonth(dateObj), dateFormat),
  ];
};

export const defaultDateValues = {
  from: startOfMonth(new Date()).toISOString(),
  to: new Date().toISOString(),
};
