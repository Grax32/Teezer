import { Routes } from '@angular/router';
import { TzSelectorComponent } from './components/tz-selector/tz-selector.component';

export const routes: Routes = [

    { path: 'tz-select', component: TzSelectorComponent, pathMatch: 'full' },
];
