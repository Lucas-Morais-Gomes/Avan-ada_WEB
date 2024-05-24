import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCreateComponent, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  editModalActive: boolean = false;
  selectedProduct: Product | null = null;
  editProductForm!: FormGroup;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.initEditProductForm();
  }


  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        console.log(products)
      },
      error => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  initEditProductForm(): void {
    this.editProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
  }

  openEditModal(product: Product): void {
    this.selectedProduct = product;
    this.editProductForm.patchValue({
      name: product.name,
      type: product.type
    });
    this.editModalActive = true;
  }

  closeEditModal(): void {
    this.selectedProduct = null;
    this.editModalActive = false;
    this.editProductForm.reset();
  }

  saveChanges(): void {
    console.log('Tentando salvar mudanças...');
    console.log(this.editProductForm.value)

    if (this.editProductForm.invalid) {
      console.error('Formulário inválido. Não é possível salvar.');
      return;
    }

    const editedProduct: Product = this.editProductForm.value;
    const id: string | undefined = this.selectedProduct?._id;

    if (!id) {
      console.error('ID do produto não encontrado.');
      return;
    }

    this.productService.updateProduct(id, editedProduct).subscribe(() => {
      console.log('Produto atualizado com sucesso.');
      this.loadProducts();
      this.closeEditModal();
    }, error => {
      console.error('Erro ao atualizar produto:', error);
    });
  }

  addProductToList = (product: Product): void => {
    this.products.push(product); 
  };

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }

}
