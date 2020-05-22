import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './portal.component';

export const routes: Routes = [
    {
        path: '', component: PortalComponent,
        children: [
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            {
                path: 'user',
                loadChildren: () => import('./user/user.module').then(m => m.UserModule)
            },
            {
                path: 'manager',
                loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalRouterModule { }
