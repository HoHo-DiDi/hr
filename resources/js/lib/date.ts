import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const DATE_CONFIG = {
    DISPLAY_DATE : 'DD/MM/YYYY',
    DISPLAY_DATETIME : 'DD/MM/YYYY HH:mm',
    DB_DATE : 'DD-MM-YYYY',
    DB_DATETIME: 'DD-MM-YYYY HH:mm:ss'
} as const;

export function toDisplay(date: string | Date | null | undefined, withTime = false):string{
    if(!date) return "-";
    const format = withTime ? DATE_CONFIG.DISPLAY_DATETIME : DATE_CONFIG.DISPLAY_DATE;
    return dayjs(date).format(format);
}

export function toDB(date: string | Date | null | undefined, withTime = false):string{
    if(!date) return "";
    const outputFormat = withTime ? DATE_CONFIG.DB_DATETIME : DATE_CONFIG.DB_DATE;
    if(date instanceof Date) return dayjs(date).format(outputFormat);

    const parseFormat = withTime ? DATE_CONFIG.DISPLAY_DATETIME : DATE_CONFIG.DISPLAY_DATE;
    const d = dayjs(date,parseFormat, true);
    return d.isValid() ? d.format(outputFormat) : "";
}

export function todayDB():string{
    return dayjs().format(DATE_CONFIG.DB_DATE);
}