import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SubjectService {
    private apiUrl = 'http://localhost:3000/subjects';

    constructor(private http: HttpClient) { }

    getAllSubjects(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    updateSubject(subjectId: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${subjectId}`, data);
    }

    deleteSubject(subjectId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${subjectId}`);
    }

    createSubject(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}