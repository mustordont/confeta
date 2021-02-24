import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    public static set(key: string, value: any): void {
       localStorage.setItem(key, JSON.stringify(value));
    }

    public static get(key: string): any {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        try {
            return JSON.parse(value);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public static remove(key: string): any {
        localStorage.removeItem(key);
    }
}
