import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { MentorService } from '../../services/mentor.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
    StudentArray: any[] = [];
    MentorArray: any[] = [];
    currentStudentID = "";
    name: string = "";
    address: string = "";
    phone: string = "";
    mentor: string = "";

    constructor(private studentService: StudentService, private mentorService: MentorService) { }

    ngOnInit() {
        this.getAllStudent();
        this.mentorService.getAllMentors().subscribe((data: any) => {
            this.MentorArray = data;
        });
      
    }

    getAllStudent() {
        this.studentService.getAllStudents().subscribe((resultData: any) => {
            console.log(resultData);
            this.StudentArray = resultData;
        });
    }

    setUpdate(data: any) {
        this.name = data.name;
        this.address = data.address;
        this.phone = data.phone;
        this.mentor = data.mentor,
        this.currentStudentID = data._id;
    }

    updateRecords() {
        let bodyData = {
            "name": this.name,
            "address": this.address,
            "phone": this.phone,
            "mentor": this.mentor
        };

        this.studentService.updateStudent(this.currentStudentID, bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Estudante atualizado.');
            this.currentStudentID = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.mentor = '';
            this.getAllStudent();
        });
    }

    setDelete(data: any) {
        this.studentService.deleteStudent(data._id).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Estudante deletado.');
            this.getAllStudent();
        });
    }

    save() {
        if (this.currentStudentID == '') {
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
            "mentor": this.mentor
        };

        this.studentService.createStudent(bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Estudante criado com sucesso.');
            this.currentStudentID = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.mentor = '';
            this.getAllStudent();
        });
    }
}