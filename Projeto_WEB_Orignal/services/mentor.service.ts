import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MentorService {
    private apiUrl = 'http://localhost:3000/mentors';

    constructor(private http: HttpClient) { }

    getAllMentors(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    updateMentor(mentorId: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${mentorId}`, data);
    }

    deleteMentor(mentorId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${mentorId}`);
    }

    createMentor(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}