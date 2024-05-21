import { Component, OnInit, Input } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {
  @Input() addSupplierToList!: (supplier: Supplier) => void;
  products: Product[] = [];
  supplierForm!: FormGroup;

  constructor(
    private supplierService: SupplierService, 
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.supplierForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")
      ]),
      cnpj: new FormControl("", [
        Validators.required,
        Validators.pattern("\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}")
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern("\\(\\d{2}\\) \\d{4,5}-\\d{4}")
      ]),
      product: new FormControl("", Validators.required)
    });
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  createSupplier(): void {
    if (this.supplierForm.invalid) {
      return;
    }

    const supplier: Supplier = this.supplierForm.value;
    this.supplierService.createSupplier(supplier).subscribe((newSupplier: Supplier) => {
      this.addSupplierToList(newSupplier);
      this.resetForm();
    });
  }

  resetForm(): void {
    this.supplierForm.reset();
  }
}
