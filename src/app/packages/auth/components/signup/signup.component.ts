import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Base64Helper, UserModel, HttpResponse } from '@loan-app/common';
import { URLConfig } from '../../../../config/url.config';

@Component({
    selector: 'loan-app-signup',
    templateUrl: 'signup.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    errorMessage: string;
    successMessage: string;

    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        // Login form
        this.signupForm = this._formBuilder.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    /**
     * Hook to handle methods on component init
     */
    ngOnInit(): void {
        Base64Helper.removeAuthToken(); // Remove stored user details when user comes to login page
    }

    /**
     * Function to handle login scenario
     */
    signup(userData: UserModel): void {

        this._httpClient.post<HttpResponse>(URLConfig.signupURL, userData)
            .subscribe(response => {
                if (response && response.success) {
                    this.successMessage = 'Success!, Please wait we\'ll take you to login page automatically';

                    setTimeout(() => {
                        this.successMessage = null;
                        this._detectChanges();
                        this._router.navigate(['/login']);
                    }, 3 * 1000);

                } else {
                    this.errorMessage = response.message;

                    setTimeout(() => {
                        this.errorMessage = null;
                        this._detectChanges();
                    }, 3 * 1000);
                }

                this._detectChanges();
            });
    }

    /**
     * Detect changes
     */
    private _detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }

}
