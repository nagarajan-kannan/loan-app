import {
    Component, ChangeDetectionStrategy, Input, Output, EventEmitter
} from '@angular/core';
import { LoanList } from '@loan-app/portal/common';

@Component({
    selector: 'loan-app-loan-list',
    templateUrl: 'loan-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanListComponent {

    @Input() loanLists: LoanList[] = [];
    @Output() onRowClick: EventEmitter<LoanList> = new EventEmitter<LoanList>();

    constructor() { }

    onClick(loanDetails: LoanList): void {
        this.onRowClick.emit(loanDetails);
    }

}
