import { Component, OnInit } from "@angular/core";
import { ProdutoService } from "../../services/produto.service";
import {FornecedorService } from "../../services/fornecedor.service";

@Component({
    selector: 'app-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.css']
})

export class ProdutoComponent implements OnInit {
    ProdutoArray: any[] = []
    FornecedorArray: any[] = []
    currentProdutoId = "";
    name: string = "";
    fornecedor: any = null;
    field: string = "";

    constructor(private produtoService: ProdutoService,private fornecedorService: FornecedorService) {}

    ngOnInit() {
        this.getAllProdutos();
        this.fornecedorService.getAllFornecedors().subscribe((data: any) => {
            this.FornecedorArray = data;
        });
    }
    
    getAllProdutos() {
        this.produtoService.getAllProdutos().subscribe((resultData: any) => {
            console.log(resultData);
            this.ProdutoArray = resultData;
        });
    }

    setUpdate(data: any) {
        this.currentProdutoId = data._id;
        this.name = data.name;
        this.field = data.field;
        this.fornecedor = data.fornecedor;
    }

    updateRecords() {
        let bodyData = {
            "name": this.name,
            "field": this.field,
            "fornecedor": this.fornecedor,
        };

        this.produtoService.updateProduto(this.currentProdutoId, bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Produto atualizado.');
            this.currentProdutoId = '';
            this.name = '';
            this.field = '';
            this.fornecedor = '';
            this.getAllProdutos();
        });
    }

    setDelete(data: any) {
        this.produtoService.deleteProduto(data._id).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Produto deletado.');
            this.getAllProdutos();
        });
    }

    save() {
        if (this.currentProdutoId == '') {
            this.register();
        }
        else {
            this.updateRecords();
        }
    }

    register() {
        let bodyData = {
            "name": this.name,
            "field": this.field,
            "fornecedor": this.fornecedor,
        };

        this.produtoService.createProduto(bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Produto cadastrado com sucesso.');
            this.currentProdutoId = '';
            this.name = '';
            this.field = '';
            this.fornecedor = '';
            this.getAllProdutos();
        });
    }
}