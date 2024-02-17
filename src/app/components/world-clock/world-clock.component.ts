import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { DateTimeFormatPipe } from "../../pipes/datetime-format.pipe";
import { TimeFormatPipe } from "../../pipes/time-format.pipe";
import { NgFor } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { PreferencesService } from '../../services/preferences.service';

@Component({
    selector: 'app-world-clock',
    standalone: true,
    templateUrl: './world-clock.component.html',
    styleUrl: './world-clock.component.scss',
    imports: [DateFormatPipe, DateTimeFormatPipe, TimeFormatPipe, NgFor]
})
export class WorldClockComponent implements OnDestroy {
    private _onDestroy = new Subject<void>();

    @Input() public timevalue: string = 'now';
    @Input() public timezone: string = 'America/New_York';

    public timevalueWithTick: [string] = [this.timevalue];

    constructor(private preferencesService: PreferencesService) {
        this.preferencesService.currentTimezone$.pipe(takeUntil(this._onDestroy)).subscribe(timezone => {
            this.timezone = timezone;
            this.timevalueWithTick = [this.timevalue];
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
