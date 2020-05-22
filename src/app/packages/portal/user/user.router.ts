import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanStatusComponent, ApplyLoanComponent } from './components/index';

export const routes: Routes = [
    { path: '', redirectTo: 'loan-status', pathMatch: 'full' },
    { path: 'loan-status', component: LoanStatusComponent },
    { path: 'apply-loan', component: ApplyLoanComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRouterModule { }
