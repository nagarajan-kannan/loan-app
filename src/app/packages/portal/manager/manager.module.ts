import { NgModule } from '@angular/core';

import { SharedModule } from '@loan-app/common';

import { LoanRequestsComponent, LoanDetailsComponent } from './components/index';
import { ManagerRouterModule } from './manager.router';
import { ManagerService } from './manager.service';

@NgModule({
    imports: [
        ManagerRouterModule,
        SharedModule
    ],
    declarations: [
        LoanRequestsComponent,
        LoanDetailsComponent
    ],
    providers: [ManagerService]
})
export class ManagerModule { }
