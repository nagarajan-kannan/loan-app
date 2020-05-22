import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { STORAGE, HttpResponse, USER_ROLE } from '@loan-app/common';
import { LoanList } from '@loan-app/portal/common';
import { URLConfig } from '../../../../../config/url.config';
import { ManagerService } from '../../manager.service';

@Component({
    selector: 'loan-app-loan-details',
    templateUrl: 'loan-details.component.html',
    styleUrls: ['loan-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanDetailsComponent implements OnInit {

    loanDetails: LoanList;
    successMessage: string;

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
        this.loanDetails = this._managerService.getCurrentLoanDetail();

        if (!this.loanDetails) {
            this.goToRequestPage();
        }
    }

    /**
     * Update the loan status
     * @param accept
     */
    onActionClick(accept: boolean = false): void {
        const userData = JSON.parse(sessionStorage.getItem(STORAGE.USER_DATA))?.data;

        if (userData.role === USER_ROLE.MANAGER) {
            this.loanDetails.managerApproval = accept ? 'Accepted' : 'Rejected';
        } else {
            this.loanDetails.loanStatus = accept ? 'Accepted' : 'Rejected';
        }

        this._saveLoanStatus();
    }

    /**
     * Save Loan status
     */
    private _saveLoanStatus(): void {
        this._httpClient.post<HttpResponse>(URLConfig.updateLoanURL, this.loanDetails)
            .subscribe(response => {
                if (response && response.success) {
                    this.successMessage = 'Loan status has been succesfully updated, Please wait we\'ll take you to previous page';
                    this._detectChanges();

                    setTimeout(() => {
                        this.successMessage = null;
                        this.goToRequestPage();
                    }, 3 * 1000)
                }
            });
    }

    /**
     * Navigate to requests page
     */
    goToRequestPage(): void {
        this._router.navigate(['../loan-requests'], { relativeTo: this._activatedRoute });
    }

    /**
     * Detect changes
     */
    private _detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }
}
