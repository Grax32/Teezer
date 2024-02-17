import { Injectable } from "@angular/core";
import { PreferencesService } from "./preferences.service";
import { formatToTimeZone } from "date-fns-timezone";

@Injectable({
    providedIn: 'root'
})
export class DateTimeFormatterService {
    constructor(private preferencesService: PreferencesService) { }

    public formatToTimeZone(dateTimeValue: string, format: string, timezone: string = ''): string {
        const timeZone = timezone || this.preferencesService.getCurrentTimezone();

        if (!timezone) {
            console.warn('Unable to determine timezone');
        } 
        
        if (!format) {
            throw new Error('Format must be provided to ' + DateTimeFormatterService.name + '.formatToTimeZone');
        }

        if (!dateTimeValue || dateTimeValue === 'now' || dateTimeValue === 'NOW') {
            return formatToTimeZone(new Date(), format, { timeZone });
        }

        return formatToTimeZone(dateTimeValue, format, { timeZone });
    }
}