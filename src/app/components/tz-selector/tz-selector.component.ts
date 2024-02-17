import { JsonPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PreferencesService } from '../../services/preferences.service';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe, TimeFormatPipe, DateTimeFormatPipe } from '../../pipes';
import { timezoneRegions, timezones } from '../../functions/datetime.functions';
import { WorldClockComponent } from "../world-clock/world-clock.component";

@Component({
    selector: 'app-tz-selector',
    standalone: true,
    templateUrl: './tz-selector.component.html',
    styleUrl: './tz-selector.component.scss',
    imports: [NgFor, DateFormatPipe, TimeFormatPipe, DateTimeFormatPipe, FormsModule, JsonPipe, WorldClockComponent]
})
export class TzSelectorComponent {

    constructor(private preferencesService: PreferencesService) {
        this.selectedTimezone = this.preferencesService.getCurrentTimezone();
        this.selectedRegion = this.selectedTimezone.split('/')[0];
        this.timezoneRegions = timezoneRegions;
        this.filteredTimezones = this.timezones.filter(tz => tz.area === this.selectedRegion || tz.collection === this.selectedRegion);
    }

    public timezones = timezones;
    public filteredTimezones: typeof this.timezones;
    public timezoneRegions = timezoneRegions;

    public selectedRegion: string;
    public selectedTimezone: string;

    public theTime: [string] = [(new Date()).toISOString()];

    public get timeFormat() {
        return this.preferencesService.getDateTimeFormat();
    }

    public updateTimezoneRegion(region: string): void {
        this.selectedRegion = region;
        this.filteredTimezones = this.timezones.filter(tz => tz.area === this.selectedRegion || tz.collection === this.selectedRegion);
        this.updateDateTimeValue(this.theTime[0]);
    }

    public updateTimezone(timezone: string): void {
        this.preferencesService.setCurrentTimezone(timezone);
        this.selectedTimezone = timezone;
        this.updateDateTimeValue(this.theTime[0]);
    }

    public updateDateTimeValue(newTime: string): void {
        // set the time to the new time in an array so that the pipe will update
        this.theTime = [newTime];
    }
}
