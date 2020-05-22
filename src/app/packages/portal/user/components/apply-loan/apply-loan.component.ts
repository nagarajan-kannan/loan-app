import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpResponse, STORAGE } from '@loan-app/common';
import { URLConfig } from '../../../../../config/url.config';

@Component({
    selector: 'loan-app-apply-loan',
    templateUrl: 'apply-loan.component.html',
    styleUrls: ['apply-loan.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplyLoanComponent {

    applyLoanForm: FormGroup;
    successMessage: string;

    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        // Apply new loan form
        this.applyLoanForm = this._formBuilder.group({
            'customerName': [null, Validators.required],
            'loanType': [null, Validators.required],
            'loanAmount': [null, Validators.required]
        });
    }

    /**
     * Cancel the new loan and navigate to loan status page
     */
    cancelApplying(): void {
        this._router.navigate(['../loan-status'], { relativeTo: this._activatedRoute });
    }

    /**
     * Apply the new Loan
     */
    applyLoan(loanDetails: any): void {
        const userDetails = JSON.parse(sessionStorage.getItem(STORAGE.USER_DATA))?.data;

        loanDetails.createdBy = userDetails.username;
        loanDetails.id = `${userDetails.username}${Date.now()}`;

        this._httpClient.post<HttpResponse>(URLConfig.newLoanURL, loanDetails)
            .subscribe(response => {
                if (response && response.success) {
                    this.successMessage = 'Your loan request has been successfully submitted. Check back later for updated loan status';
                    this._detectChanges();

                    setTimeout(() => {
                        this.successMessage = null;
                        this.cancelApplying();
                    }, 3 * 1000);
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
