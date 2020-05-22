import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanApp404Component, AuthGuard } from '@loan-app/common';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./packages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'portal',
    loadChildren: () => import('./packages/portal/portal.module').then(m => m.PortalModule),
    canActivateChild: [AuthGuard]
  },
  { path: '**', component: LoanApp404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
