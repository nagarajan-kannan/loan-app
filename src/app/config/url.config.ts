const APPNAME = 'loanapp', VERSION = 'v1';

export const URLConfig = {
    loginURL: `/${APPNAME}/auth/${VERSION}/login`,
    signupURL: `/${APPNAME}/auth/${VERSION}/signup`,
    loanListURL: `/${APPNAME}/loans/${VERSION}/loan-list`,
    newLoanURL: `/${APPNAME}/loans/${VERSION}/new-loan`,
    updateLoanURL: `/${APPNAME}/loans/${VERSION}/update-loan`
}
