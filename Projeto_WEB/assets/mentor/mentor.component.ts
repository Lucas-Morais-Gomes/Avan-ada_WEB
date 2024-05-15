import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { MentorService } from "../../services/mentor.service";
import { SubjectService } from "../../services/subject.service";

@Component({
    selector: 'app-mentor',
    templateUrl: './mentor.component.html',
    styleUrls: ['./mentor.component.css']
})

export class MentorComponent implements OnInit {
    MentorArray: any[] = [];
    SubjectArray: any[] = [];
    currentMentorId = "";
    name: string = "";
    address: string = "";
    phone: string = "";
    subject: string = "";

    constructor(private mentorService: MentorService, private subjectService: SubjectService) { }

    ngOnInit() {
        this.getAllMentors();
        this.subjectService.getAllSubjects().subscribe((data: any) => {
            this.SubjectArray = data;
        });
    }

    getAllMentors() {
        this.mentorService.getAllMentors().subscribe((resultData: any) => {
            console.log(resultData);
            this.MentorArray = resultData;
        });
    }

    setUpdate(data: any) {
        this.name = data.name;
        this.address = data.address;
        this.phone = data.phone;
        this.subject = data.subject;
        this.currentMentorId = data._id;
    }

    updateRecords() {
        let bodyData = {
            "name": this.name,
            "address": this.address,
            "phone": this.phone,
            "subject": this.subject
        };

        this.mentorService.updateMentor(this.currentMentorId, bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Mentor atualizado.');
            this.currentMentorId = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.subject = '';
            this.getAllMentors();
        });
    }

    setDelete(data: any) {
        this.mentorService.deleteMentor(data._id).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Mentor deletado.');
            this.getAllMentors();
        });
    }

    save() {
        if (this.currentMentorId == '') {
            this.register();
        }
        else {
            this.updateRecords();
        }
    }

    register() {
        let bodyData = {
            "name": this.name,
            "address": this.address,
            "phone": this.phone,
            "subject": this.subject
        };

        this.mentorService.createMentor(bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Mentor criado com sucesso.');
            this.currentMentorId = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.subject = '';
            this.getAllMentors();
        });
    }
}