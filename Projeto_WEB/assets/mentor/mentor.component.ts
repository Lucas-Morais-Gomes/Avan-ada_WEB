import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { MentorService } from "../../services/mentor.service";
import { ProductService } from "../../services/product.service";

@Component({
    selector: 'app-mentor',
    templateUrl: './mentor.component.html',
    styleUrls: ['./mentor.component.css']
})

export class MentorComponent implements OnInit {
    MentorArray: any[] = [];
    ProductArray: any[] = []; // Alteração aqui: Renomear de SubjectArray para ProductArray
    currentMentorId = "";
    name: string = "";
    address: string = "";
    phone: string = "";
    product: string = ""; // Alteração aqui: Renomear de subject para product

    constructor(private mentorService: MentorService, private productService: ProductService) { }

    ngOnInit() {
        this.getAllMentors();
        this.productService.getAllProducts().subscribe((data: any) => { // Alteração aqui: Chamar productService em vez de subjectService
            this.ProductArray = data; // Alteração aqui: Renomear de SubjectArray para ProductArray
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
        this.product = data.product; // Alteração aqui: Renomear de subject para product
        this.currentMentorId = data._id;
    }

    updateRecords() {
        let bodyData = {
            "name": this.name,
            "address": this.address,
            "phone": this.phone,
            "product": this.product // Alteração aqui: Renomear de subject para product
        };

        this.mentorService.updateMentor(this.currentMentorId, bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Mentor atualizado.');
            this.currentMentorId = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.product = ''; // Alteração aqui: Limpar product após atualização
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
            "product": this.product // Alteração aqui: Renomear de subject para product
        };

        this.mentorService.createMentor(bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Mentor criado com sucesso.');
            this.currentMentorId = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.product = ''; // Alteração aqui: Limpar product após criação
            this.getAllMentors();
        });
    }
}
