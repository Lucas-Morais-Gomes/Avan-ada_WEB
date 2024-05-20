import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  @Input() addProductToList!: (product: Product) => void;
  product = { name: '', type: '' };

  constructor(private productService: ProductService, private router: Router) { }

  createProduct(): void {
    this.productService.createProduct(this.product).subscribe((newProducts: Product) => {
      this.addProductToList(newProducts);
      this.resetForm()
    });
  }

  resetForm(): void {
    this.product = { name: '', type: '' };
  }

}
