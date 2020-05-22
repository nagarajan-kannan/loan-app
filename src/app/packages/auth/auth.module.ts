import { NgModule } from '@angular/core';

import { SharedModule } from '@loan-app/common';

import { LoginComponent, SignupComponent } from './components/index';
import { AuthRouterModule } from './auth.router';

@NgModule({
    imports: [
        AuthRouterModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    providers: []
})
export class AuthModule { }
