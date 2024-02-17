import { Injectable } from '@angular/core';
import { isSupportedTimezone } from '../functions/datetime.functions';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PreferencesService {

    private _dateFormat: string = 'YYYY-MM-D';
    private _timeFormat: string = 'HH:mm z';
    private _dateTimeFormat: string = `${this._dateFormat} ${this._timeFormat}`;

    private _currentTimezone: ReplaySubject<string> = new ReplaySubject<string>(1);

    constructor() {

        this._currentTimezone.next(this.getCurrentTimezone());
    }

    public get currentTimezone$() {
        return this._currentTimezone.asObservable();
    }


    public getDateFormat(): string {
        return this._dateFormat;
    }

    public getTimeFormat(): string {
        return this._timeFormat;
    }

    public getDateTimeFormat(): string {
        return this._dateTimeFormat;
    }

    public setDateFormat(format: string): void {
        this._dateFormat = format;
    }

    public setTimeFormat(format: string): void {
        this._timeFormat = format;
    }

    public setDateTimeFormat(format: string): void {
        this._dateTimeFormat = format;
    }

    public setCurrentTimezone = (timezone: string) => {
        const isSupported = isSupportedTimezone(timezone);
        if (!isSupported) {
            throw new Error(`Timezone ${timezone} is not supported`);
        }

        window.localStorage.setItem('timezone', timezone);
        this._currentTimezone.next(timezone);
    };

    public getCurrentTimezone = () => {
        const tzSetting = window.localStorage.getItem('timezone') ?? '';
        const isSupported = isSupportedTimezone(tzSetting);
        if (isSupported) {
            return tzSetting;
        }

        const browserSetting = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (!isSupported) {
            console.log(`Timezone ${tzSetting} is not supported, using browser setting ${browserSetting}`);
        }
        return browserSetting;
    };

}