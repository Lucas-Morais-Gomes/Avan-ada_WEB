import { Routes, RouterModule } from "@angular/router";
import { FornecedorComponent } from "../fornecedor/fornecedor.component";
import { ClienteComponent } from "../cliente/cliente.component";
import { ProdutoComponent } from "../produto/produto.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo:'/produtos', pathMatch: 'full'},
    {path: 'produtos', component: ProdutoComponent},
    {path: 'fornecedores', component: FornecedorComponent},
    {path: 'clientes', component: ClienteComponent}
];

export const myrouting = RouterModule.forRoot(APP_ROUTES);