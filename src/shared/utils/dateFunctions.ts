import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Gets the formatted time distance from the given date to the present.
 * @param date Date in millisecond time format.
 * @returns String representing the time distance from the date to the present.
 */
export const getFormatDistanceToNow = (date: number): string => {
  const fromNow = formatDistanceToNow(date, { locale: es });
  return `hace ${fromNow}`;
};

/**
 * Converts a date string in string format to time in milliseconds.
 * @param dateString Date string in string format.
 * @returns Time in milliseconds.
 */
export const convertDateStringToTimeInMilliseconds = (dateString: string): number => {
  const dateObject = new Date(dateString);
  const timeInMilliseconds = dateObject.getTime();
  return timeInMilliseconds;
}