import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StudentService {
    private apiUrl = 'http://localhost:3000/students';

    constructor(private http: HttpClient) { }

    getAllStudents(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    updateStudent(studentId: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${studentId}`, data);
    }

    deleteStudent(studentId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${studentId}`);
    }

    createStudent(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}