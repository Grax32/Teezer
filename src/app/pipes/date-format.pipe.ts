import { Pipe, PipeTransform } from "@angular/core";
import { getValueFromChangerString } from "../functions/changer.functions";
import { DateTimeFormatterService } from "../services/datetime-formatter.service";
import { PreferencesService } from "../services/preferences.service";

@Pipe({
    standalone: true,
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

    constructor(
        private dateTimeFormatterSerice: DateTimeFormatterService,
        private preferencesService: PreferencesService) { }

    transform(isoString: string | [string], timezone: string = ''): string {
        const timeZone = timezone || this.preferencesService.getCurrentTimezone();
        const format = this.preferencesService.getDateFormat();
        const dateValue = getValueFromChangerString(isoString).trim();

        return this.dateTimeFormatterSerice.formatToTimeZone(dateValue, format, timeZone);
    }
}