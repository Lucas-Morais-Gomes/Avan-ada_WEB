import { Component, OnInit } from "@angular/core";
import { productsService } from "../../services/products.service";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})

export class productsComponent implements OnInit {
    productsArray: any[] = []
    currentproductsId = "";
    name: string = "";
    field: string = "";

    constructor(private productsService: productsService) {}

    ngOnInit() {
        this.getAllproductss();
    }
    
    getAllproductss() {
        this.productsService.getAllproductss().subscribe((resultData: any) => {
            console.log(resultData);
            this.productsArray = resultData;
        });
    }

    setUpdate(data: any) {
        this.currentproductsId = data._id;
        this.name = data.name;
        this.field = data.field;
    }

    updateRecords() {
        let bodyData = {
            "name": this.name,
            "field": this.field,
        };

        this.productsService.updateproducts(this.currentproductsId, bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Matéria atualizada.');
            this.currentproductsId = '';
            this.name = '';
            this.field = '';
            this.getAllproductss();
        });
    }

    setDelete(data: any) {
        this.productsService.deleteproducts(data._id).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Matéria deletada.');
            this.getAllproductss();
        });
    }

    save() {
        if (this.currentproductsId == '') {
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

        this.productsService.createproducts(bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Matéria criada com sucesso.');
            this.currentproductsId = '';
            this.name = '';
            this.field = '';
            this.getAllproductss();
        });
    }
}