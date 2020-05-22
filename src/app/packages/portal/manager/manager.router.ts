import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanRequestsComponent, LoanDetailsComponent } from './components/index';

export const routes: Routes = [
    { path: '', redirectTo: 'loan-requests', pathMatch: 'full' },
    { path: 'loan-requests', component: LoanRequestsComponent },
    { path: 'loan-details', component: LoanDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRouterModule { }
