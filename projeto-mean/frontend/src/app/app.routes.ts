import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './components/supplier-create/supplier-create.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderListComponent } from './components/order-list/order-list.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'create-product', component: ProductCreateComponent },
  { path: 'suppliers', component: SupplierListComponent },
  { path: 'create-supplier', component: SupplierCreateComponent },
  { path: 'create-order', component: OrderCreateComponent },
  { path: 'orders', component: OrderListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
