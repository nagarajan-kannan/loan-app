import { NgModule } from '@angular/core';

import { HeaderComponent } from '@loan-app/portal/common';

import { PortalComponent } from './portal.component';
import { PortalRouterModule } from './portal.router';

@NgModule({
    imports: [
        PortalRouterModule
    ],
    declarations: [
        PortalComponent,
        HeaderComponent
    ],
    providers: []
})
export class PortalModule { }
