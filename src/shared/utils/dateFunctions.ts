import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const getFormatDistanceToNow = (date: number): string => {
  const fromNow = formatDistanceToNow(date, { locale: es });
  return `hace ${fromNow}`;
};

export const convertDateStringToTimeInMilliseconds = (dateString: string): number => {
  const dateObject = new Date(dateString);
  const timeInMilliseconds = dateObject.getTime();
  return timeInMilliseconds;
}