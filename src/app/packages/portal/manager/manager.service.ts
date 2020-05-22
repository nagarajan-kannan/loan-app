import { Injectable } from '@angular/core';
import { LoanList } from '@loan-app/portal/common';

@Injectable()
export class ManagerService {

    private _currentLoanDetail: LoanList;

    constructor() { }

    /**
     * Set current details
     * @param {LoanList} loanDetail
     */
    setCurrentLoanDetail(loanDetail: LoanList): void {
        this._currentLoanDetail = loanDetail;
    }

    /**
     * Get current details
     * @returns {LoanList}
     */
    getCurrentLoanDetail(): LoanList {
        return this._currentLoanDetail;
    }

}
