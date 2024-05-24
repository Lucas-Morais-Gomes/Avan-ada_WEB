import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { OrderCreateComponent } from '../order-create/order-create.component';
import { Product } from '../../models/product.model';
import { Supplier } from '../../models/supplier.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, OrderCreateComponent, ReactiveFormsModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  products: Product[] = [];
  suppliers: Supplier[] = [];
  editModalActive: boolean = false;
  selectedOrder: Order | null = null;
  editOrderForm!: FormGroup;


  constructor(private orderService: OrderService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private formBuilder: FormBuilder
) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadProducts();
    this.loadSuppliers();
    this.initForm();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log(orders)
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }

  addOrderToList = (order: Order): void => {
      this.orders.push(order);
    };


  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    })
  }

  initForm(): void {
    this.editOrderForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      product: ['', Validators.required],
      supplier: ['']
    });
  }

  openEditModal(order: Order): void {
    this.selectedOrder = order;
    this.editOrderForm.patchValue({
      name: order.name,
      email: order.email,
      cpf: order.cpf,
      product: order.product,
      supplier: order.supplier // Assuming supplier is optional
    });
    this.editModalActive = true;
  }

  closeEditModal(): void {
    this.selectedOrder = null;
    this.editModalActive = false;
    this.editOrderForm.reset();
  }

  saveChanges(): void {
    console.log('Tentando salvar mudanças...');
    console.log(this.editOrderForm.value)

    const editedOrder: Order = this.editOrderForm.value;
    const id: string | undefined = this.selectedOrder?._id;

    if (!id) {
      console.error('ID do pedido não encontrado.');
      return;
    }

    this.orderService.updateOrder(id, editedOrder).subscribe(() => {
      console.log('Pedido atualizado com sucesso.');
      this.loadOrders();
      this.closeEditModal();
    }, error => {
      console.error('Erro ao atualizar pedido:', error);
    });
  }

  onProductChange(productId: string): void {
    this.productService.getSuppliersByProductId(productId).subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }
}