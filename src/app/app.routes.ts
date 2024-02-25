import { Routes } from '@angular/router';
import { CarModelColorConfigComponent } from './components/car-model-color-config/car-model-color-config.component';
import { CarConfigOptionsComponent } from './components/car-config-options/car-config-options.component';
import { CostSummaryComponent } from './components/cost-summary/cost-summary.component';

export const routes: Routes = [
    { path: '', redirectTo: 'step1', pathMatch: 'full' },
    { path: 'step1', component: CarModelColorConfigComponent },
    { path: 'step2', component: CarConfigOptionsComponent },
    { path: 'step3', component: CostSummaryComponent },
];
