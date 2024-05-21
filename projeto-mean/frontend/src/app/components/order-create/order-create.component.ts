import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { Product } from '../../models/product.model';
import { Supplier } from '../../models/supplier.model';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  @Input() addOrderToList!: (order: Order) => void;
  orderForm!: FormGroup;
  products: Product[] = [];
  suppliers: Supplier[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      product: ['', Validators.required],
      supplier: ['']
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onProductChange(productId: string): void {
    this.productService.getSuppliersByProductId(productId).subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }

  createOrder(): void {
    if (this.orderForm.invalid) {
      return;
    }

    this.orderService.createOrder(this.orderForm.value).subscribe((newOrder: Order) => {
      this.addOrderToList(newOrder);
      this.resetForm();
    });
  }

  resetForm(): void {
    this.orderForm.reset();
  }
}