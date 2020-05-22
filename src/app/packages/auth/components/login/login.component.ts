import {
    Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Base64Helper, UserModel, HttpResponse } from '@loan-app/common';
import { URLConfig } from '../../../../config/url.config';

@Component({
    selector: 'loan-app-login',
    templateUrl: 'login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage: string;

    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        // Login form
        this.loginForm = this._formBuilder.group({
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
    login(userData: UserModel): void {

        this._httpClient.post<HttpResponse>(URLConfig.loginURL, userData)
            .subscribe(response => {
                if (response && response.success) {
                    Base64Helper.setAuthToken(response);
                    const routerURL = (response.data.role === 'end-user') ? '/portal/user' : '/portal/manager';
                    this._router.navigate([routerURL]);
                } else {
                    this.errorMessage = response.message;
                    this._detectChanges();

                    setTimeout(() => {
                        this.errorMessage = null;
                        this._detectChanges();
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
