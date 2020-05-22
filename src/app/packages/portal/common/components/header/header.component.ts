import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE } from '@loan-app/common';

@Component({
    selector: 'loan-app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

    username: string;

    constructor(
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    /**
     * Hook to handle methods on component init
     */
    ngOnInit(): void {
        const userData = JSON.parse(sessionStorage.getItem(STORAGE.USER_DATA))?.data;

        if (userData && userData.username) {
            this.username = userData.username;
        }

        this._detectChanges();
    }

    logout(): void {
        this._router.navigate(['/login']);
    }

    /**
     * Detect changes
     */
    private _detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }

}
