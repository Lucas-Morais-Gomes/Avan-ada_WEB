import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    ProductArray: any[] = [];
    currentProductId = "";
    name: string = "";
    area: string = "";

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.getAllProducts();
    }
    
    getAllProducts() {
        this.productService.getAllProducts().subscribe(
            (resultData: any) => {
                this.ProductArray = resultData;
            },
            (error) => {
                console.error('Error fetching products:', error);
            }
        );
    }

    setUpdate(data: any) {
        this.currentProductId = data._id;
        this.name = data.name;
        this.area = data.area;
    }

    updateRecords() {
        if (!this.name || !this.area) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        let bodyData = {
            "name": this.name,
            "area": this.area,
        };

        this.productService.updateProduct(this.currentProductId, bodyData).subscribe(
            (resultData: any) => {
                alert('Produto atualizado.');
                this.currentProductId = '';
                this.name = '';
                this.area = '';
                this.getAllProducts();
            },
            (error) => {
                console.error('Error updating product:', error);
            }
        );
    }

    setDelete(data: any) {
        this.productService.deleteProduct(data._id).subscribe(
            (resultData: any) => {
                alert('Produto deletado.');
                this.getAllProducts();
            },
            (error) => {
                console.error('Error deleting product:', error);
            }
        );
    }

    save() {
        if (!this.name || !this.area) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (this.currentProductId === '') {
            this.register();
        } else {
            this.updateRecords();
        }
    }

    register() {
        let bodyData = {
            "name": this.name,
            "area": this.area,
        };

        this.productService.createProduct(bodyData).subscribe(
            (resultData: any) => {
                alert('Produto criado com sucesso.');
                this.currentProductId = '';
                this.name = '';
                this.area = '';
                this.getAllProducts();
            },
            (error) => {
                console.error('Error creating product:', error);
            }
        );
    }
}
