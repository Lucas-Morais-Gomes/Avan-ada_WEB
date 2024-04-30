import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class UserService {
  private baseUrl = 'http://localhost:3000';

  private userServices: User[] = [];

  errorHandler(e: any, info: string): Observable<any> {
    throw {
      info_extra: info,
      error_SS: e, //pega o server-side error
      error_CS: 'Client-Side: errorHandler : Ocorreu um erro!', //Pega o client-side error
    };
  }

  private http = inject(HttpClient);

  // cadastrarUsuario(usuario: any): Observable<any> {
  //   return this.http.post<any>(this.baseUrl, usuario);
  // }

  cadastrarUsuario(usuario: any) {
    this.userServices.push(usuario);
    console.log(this.userServices);

    return this.http
      .post<any>(`${this.baseUrl}/user`, usuario)
      .pipe(catchError((e) => this.errorHandler(e, 'cadastrarUsuario()')));
  }
}
