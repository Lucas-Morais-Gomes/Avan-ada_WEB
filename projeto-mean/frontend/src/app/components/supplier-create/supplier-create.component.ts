import { Component, OnInit, Input } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {
  @Input() addSupplierToList!: (supplier: Supplier) => void; // Use o operador ! para assegurar a inicialização

  supplier = { name: '', email: '', cnpj: '', phone: '', product: { _id: '', name: '', type: '', suppliers: [] } };
  products: Product[] = [];

  constructor(
    private supplierService: SupplierService, 
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  createSupplier(): void {
    this.supplierService.createSupplier(this.supplier).subscribe((newSupplier: Supplier) => {
      this.addSupplierToList(newSupplier); // Adicionar fornecedor à lista no componente pai
      this.resetForm();
    });
  }

  resetForm(): void {
    this.supplier = { name: '', email: '', cnpj: '', phone: '', product: { _id: '', name: '', type: '', suppliers: [] } };
  }
}
