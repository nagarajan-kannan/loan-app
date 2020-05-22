import { STORAGE } from '../constants/storage.constant';

export class Base64Helper {

    /**
     * Encode the given value as base64
     * @param {string} value
     * @returns {string}
     */
    static encode(value: string): string {
        return btoa(value);
    }

    /**
     * Decode the given value as base64
     * @param {string} value
     * @returns {string}
     */
    static decode(value: string): string {
        return atob(value);
    }

    /**
     * Set user details in session storage
     * @param {any} loginResponse
     */
    static setAuthToken(loginResponse: any): void {
        sessionStorage.setItem(STORAGE.USER_DATA, JSON.stringify(loginResponse));
    }

    /**
     * Remove user details in session storage
     */
    static removeAuthToken(): void {
        sessionStorage.removeItem(STORAGE.USER_DATA);
    }

}
