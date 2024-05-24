import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FornecedorService } from "../../services/fornecedor.service";
import { ProdutoService } from "../../services/produto.service";

@Component({
    selector: 'app-fornecedor',
    templateUrl: './fornecedor.component.html',
    styleUrls: ['./fornecedor.component.css']
})

export class FornecedorComponent implements OnInit {
    FornecedorArray: any[] = [];
    ProdutoArray: any[] = [];
    currentFornecedorId = "";
    name: string = "";
    address: string = "";
    phone: string = "";

    constructor(private fornecedorService: FornecedorService, private produtoService: ProdutoService) { }

    ngOnInit() {
        this.getAllFornecedors();
    }

    getAllFornecedors() {
        this.fornecedorService.getAllFornecedors().subscribe((resultData: any) => {
            console.log(resultData);
            this.FornecedorArray = resultData;
        });
    }

    setUpdate(data: any) {
        this.name = data.name;
        this.address = data.address;
        this.phone = data.phone;
        this.currentFornecedorId = data._id;
    }

    updateRecords() {
        let bodyData = {
            "name": this.name,
            "address": this.address,
            "phone": this.phone,
        };

        this.fornecedorService.updateFornecedor(this.currentFornecedorId, bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Fornecedor atualizado.');
            this.currentFornecedorId = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.getAllFornecedors();
        });
    }

    setDelete(data: any) {
        this.fornecedorService.deleteFornecedor(data._id).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Fornecedor deletado.');
            this.getAllFornecedors();
        });
    }

    save() {
        if (this.currentFornecedorId == '') {
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
        };

        this.fornecedorService.createFornecedor(bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Fornecedor cadastrado com sucesso.');
            this.currentFornecedorId = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.getAllFornecedors();
        });
    }
}