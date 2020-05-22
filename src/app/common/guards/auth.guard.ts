import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { STORAGE } from '../constants/storage.constant';

@Injectable()
export class AuthGuard implements CanActivateChild {

    constructor(
        private _router: Router
    ) { }

    canActivateChild(): boolean {

        if (sessionStorage.getItem(STORAGE.USER_DATA)) {
            return true;
        }

        // Not logged in so restrict to view app pages
        this._router.navigate(['/login']);
        return false;
    }

}