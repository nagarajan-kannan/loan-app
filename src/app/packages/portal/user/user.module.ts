import { NgModule } from '@angular/core';

import { SharedModule } from '@loan-app/common';

import { LoanStatusComponent, ApplyLoanComponent } from './components/index';
import { UserRouterModule } from './user.router';

@NgModule({
    imports: [
        UserRouterModule,
        SharedModule
    ],
    declarations: [
        LoanStatusComponent,
        ApplyLoanComponent
    ],
    providers: []
})
export class UserModule { }
