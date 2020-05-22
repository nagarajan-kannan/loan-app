import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { STORAGE, HttpResponse } from '@loan-app/common';
import { LoanList } from '@loan-app/portal/common';
import { URLConfig } from '../../../../../config/url.config';
import { ManagerService } from '../../manager.service';

@Component({
    selector: 'loan-app-loan-requests',
    templateUrl: 'loan-requests.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanRequestsComponent implements OnInit {

    loanLists: LoanList[] = [];

    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _activatedRoute: ActivatedRoute,
        private _managerService: ManagerService,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    /**
     * Hook to handle methods on component init
     */
    ngOnInit(): void {
        this._getLoanLists();
    }

    /**
     * On loan get clicks
     * @param {LoanList} loanDetail
     */
    onRowClick(loanDetail: LoanList): void {
        this._managerService.setCurrentLoanDetail(loanDetail);
        this._router.navigate(['../loan-details'], { relativeTo: this._activatedRoute });
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
