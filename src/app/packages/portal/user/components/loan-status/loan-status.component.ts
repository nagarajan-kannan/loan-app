import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { STORAGE, HttpResponse } from '@loan-app/common';
import { LoanList } from '@loan-app/portal/common';
import { URLConfig } from '../../../../../config/url.config';

@Component({
    selector: 'loan-app-user-loan-status',
    templateUrl: 'loan-status.component.html',
    styleUrls: ['loan-status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanStatusComponent implements OnInit {

    loanLists: LoanList[] = [];

    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    /**
     * Hook to handle methods on component init
     */
    ngOnInit(): void {
        this._getLoanLists();
    }

    /**
     * Apply a new loan functionlities
     */
    applyNewLoan(): void {
        this._router.navigate(['../apply-loan'], { relativeTo: this._activatedRoute });
    }

    /**
     * Get Loan lists fromo REST api
     */
    private _getLoanLists(): void {
        const userData = JSON.parse(sessionStorage.getItem(STORAGE.USER_DATA))?.data;

        this._httpClient.get<HttpResponse>(`${URLConfig.loanListURL}/${userData.username}`)
            .subscribe(response => {
                if (response?.data) {
                    this.loanLists = response.data;
                    this._detectChanges();
                }
            });
    }

    /**
     * Detect changes
     */
    private _detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }
}
