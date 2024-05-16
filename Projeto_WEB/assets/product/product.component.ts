import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service"; // Alteração aqui: Importar ProductService em vez de SubjectService

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
    ProductArray: any[] = []; // Alteração aqui: Renomear SubjectArray para ProductArray
    currentProductId = ""; // Alteração aqui: Renomear currentSubjectId para currentProductId
    name: string = "";
    field: string = "";

    constructor(private productService: ProductService) {} // Alteração aqui: Injetar ProductService em vez de SubjectService

    ngOnInit() {
        this.getAllProducts(); // Alteração aqui: Chamar getAllProducts em vez de getAllSubjects
    }
    
    getAllProducts() { // Alteração aqui: Renomear de getAllSubjects para getAllProducts
        this.productService.getAllProducts().subscribe((resultData: any) => { // Alteração aqui: Chamar getAllProducts em vez de getAllSubjects
            console.log(resultData);
            this.ProductArray = resultData; // Alteração aqui: Renomear SubjectArray para ProductArray
        });
    }

    setUpdate(data: any) {
        this.currentProductId = data._id; // Alteração aqui: Renomear currentSubjectId para currentProductId
        this.name = data.name;
        this.field = data.field;
    }

    updateRecords() {
        let bodyData = {
            "name": this.name,
            "field": this.field,
        };

        this.productService.updateProduct(this.currentProductId, bodyData).subscribe((resultData: any) => { // Alteração aqui: Chamar updateProduct em vez de updateSubject
            console.log(resultData);
            alert('Produto atualizado.'); // Alteração aqui: Alterar a mensagem para "Produto atualizado"
            this.currentProductId = '';
            this.name = '';
            this.field = '';
            this.getAllProducts(); // Alteração aqui: Chamar getAllProducts em vez de getAllSubjects
        });
    }

    setDelete(data: any) {
        this.productService.deleteProduct(data._id).subscribe((resultData: any) => { // Alteração aqui: Chamar deleteProduct em vez de deleteSubject
            console.log(resultData);
            alert('Produto deletado.'); // Alteração aqui: Alterar a mensagem para "Produto deletado"
            this.getAllProducts(); // Alteração aqui: Chamar getAllProducts em vez de getAllSubjects
        });
    }

    save() {
        if (this.currentProductId == '') {
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
        };

        this.productService.createProduct(bodyData).subscribe((resultData: any) => { // Alteração aqui: Chamar createProduct em vez de createSubject
            console.log(resultData);
            alert('Produto criado com sucesso.'); // Alteração aqui: Alterar a mensagem para "Produto criado com sucesso."
            this.currentProductId = '';
            this.name = '';
            this.field = '';
            this.getAllProducts(); // Alteração aqui: Chamar getAllProducts em vez de getAllSubjects
        });
    }
}
