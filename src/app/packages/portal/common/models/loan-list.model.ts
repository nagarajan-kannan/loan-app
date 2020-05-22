export class LoanList {
    id: string;
    customerName: string;
    loanType: string;
    loanAmount: number;
    loanStatus: string;
    createdBy: string;
    assignedTo: string;
    managerApproval: string;

    constructor(obj: Partial<LoanList> = {}) {
        Object.assign(this, obj);
    }
}
