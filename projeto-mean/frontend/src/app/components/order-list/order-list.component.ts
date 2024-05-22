import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { OrderCreateComponent } from '../order-create/order-create.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, OrderCreateComponent],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log(orders)
    },
    error => {
      console.error('Erro ao carregar pedidos:', error);
    }
  )};

  addOrderToList = (order: Order): void => {
      this.orders.push(order);
    };


  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    })
  }

}