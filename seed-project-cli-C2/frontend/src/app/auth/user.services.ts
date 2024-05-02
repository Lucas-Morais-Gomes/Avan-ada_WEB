import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private baseUrl = "http://localhost:3000/user";
    private htttpClient = inject(HttpClient)

    constructor(private httpClient: HttpClient) {}

    register(formValue: any) {
        // Ajustando os nomes dos campos
        const formValueToSend = {
            firstName: formValue.firstNameTS,
            lastName: formValue.lastNameTS,
            email: formValue.emailTS,
            password: formValue.passwordTS,
            country: formValue.countryTS,
            gender: formValue.genderTS,
            acceptTerms: formValue.acceptTermsTS
        };


        return firstValueFrom(
        this.httpClient.post<any>(`${this.baseUrl}/signup`, formValueToSend)
    )
    }

    login(formValue: any){
        const formValueToSend = {
            email: formValue.emailTS,
            password: formValue.passwordTS
        };

        return firstValueFrom(
            this.httpClient.post<any>(`${this.baseUrl}/signin`, formValueToSend)
    )
}

}
