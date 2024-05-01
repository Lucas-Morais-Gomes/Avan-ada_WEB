import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class UserService {
    private baseUrl = "http://localhost:3000";
    private httpClient = inject(HttpClient);

    constructor() {
    }

    register(formValue: any) {
        return firstValueFrom(
            this.httpClient.post<any>(`${this.baseUrl}/signup`, formValue)
        )
    }
}