import { Routes, RouterModule } from "@angular/router";
import { FornecedorComponent } from "../fornecedor/fornecedor.component";
import { PedidoComponent } from "../pedido/pedido.component";
import { ProdutoComponent } from "../produto/produto.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo:'/produtos', pathMatch: 'full'},
    {path: 'produtos', component: ProdutoComponent},
    {path: 'fornecedores', component: FornecedorComponent},
    {path: 'pedidos', component: PedidoComponent}
];

export const myrouting = RouterModule.forRoot(APP_ROUTES);