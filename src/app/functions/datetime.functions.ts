
import { listTimeZones } from 'timezone-support';
const commonCollectionName = 'Common';

const adjustSortable = (value: string) => {
    if (value === 'Etc/UTC') {
        return 'AAA_Etc/UTC';
    }

    return value.startsWith('Etc') ? 'AAB_' + value : value;
};

// get timezone list, filtering to only those with a area
const timezoneList = listTimeZones()
    .filter(tz => tz.includes('/'))
    .sort((a, b) => adjustSortable(a).localeCompare(adjustSortable(b)));

const getCollectionForTimezone = (timezone: string) => {
    switch (timezone) {
        case 'America/New_York':
        case 'America/Chicago':
        case 'America/Denver':
        case 'America/Phoenix':
        case 'America/Los_Angeles':
        case 'America/Anchorage':
        case 'Pacific/Honolulu':
        case 'Etc/UTC':
            return commonCollectionName;
        default:
            return '';
    }
};

const getTzName = (tz: string) => {
    const parts = tz.split('/');
    return parts.slice(1).join('/');
};

const getTzObject = (tz: string) => ({
    fullName: tz,
    shortName: getTzName(tz),
    collection: getCollectionForTimezone(tz),
    area: tz.split('/')[0]
});

const getSupportedTimezones = () => timezoneList.map(getTzObject);

const getSupportedTimezoneAreas = () => {
    const areas = [...new Set(getSupportedTimezones().map(tz => tz.area))].filter(area => area !== 'Etc');
    return ['Common', 'Etc', ...areas];
};

export const isSupportedTimezone = (timezone: string | null | undefined) => !!timezone && timezoneList.includes(timezone);

export const timezoneRegions = getSupportedTimezoneAreas();
export const timezones = getSupportedTimezones();

const listIntlTimeZones = () => Intl.supportedValuesOf('timeZone');


