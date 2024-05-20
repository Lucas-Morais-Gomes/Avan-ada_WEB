import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { Product } from '../../models/product.model';
import { Supplier } from '../../models/supplier.model';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  @Input() addOrderToList!: (order: Order) => void;
  order: any = { name: '', email: '', cpf: '', product: undefined, supplier: undefined };
  products: Product[] = [];
  suppliers: Supplier[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onProductChange(productId: string): void {
    // Carregar os fornecedores que fornecem o produto selecionado
    this.productService.getSuppliersByProductId(productId).subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }

  createOrder(): void {
    this.orderService.createOrder(this.order).subscribe((newOrder: Order) => {
      this.addOrderToList(newOrder);
      this.resetForm()
    });
  }

  resetForm(): void {
    this.order = { name: '', email: '', cpf: '', product: '', supplier: '' };
  }
}
