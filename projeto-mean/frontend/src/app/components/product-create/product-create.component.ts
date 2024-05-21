import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  @Input() addProductToList!: (product: Product) => void;
  productForm!: FormGroup;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
  }

  createProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    const product: Product = this.productForm.value;
    this.productService.createProduct(product).subscribe((newProduct: Product) => {
      this.addProductToList(newProduct);
      this.resetForm();
    });
  }

  resetForm(): void {
    this.productForm.reset();
  }
}
