import { Pipe, PipeTransform } from "@angular/core";
import { PreferencesService } from "../services/preferences.service";
import { getValueFromChangerString } from "../functions/changer.functions";
import { DateTimeFormatterService } from "../services/datetime-formatter.service";

@Pipe({
    standalone: true,
    name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

    constructor(private preferencesService: PreferencesService,
        private dateTimeFormatterService: DateTimeFormatterService) { }

    transform(isoString: string | [string], timezone: string = ''): string {
        const timeZone = timezone || this.preferencesService.getCurrentTimezone();
        const format = this.preferencesService.getDateTimeFormat();
        const dateValue = getValueFromChangerString(isoString).trim();

        return this.dateTimeFormatterService.formatToTimeZone(dateValue, format, timeZone);
    }
}