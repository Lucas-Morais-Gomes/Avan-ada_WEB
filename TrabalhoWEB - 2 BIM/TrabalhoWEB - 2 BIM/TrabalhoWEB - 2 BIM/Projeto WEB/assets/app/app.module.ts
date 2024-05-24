import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PedidoComponent } from '../pedido/pedido.component';
import { RouterOutlet } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { FornecedorComponent } from '../fornecedor/fornecedor.component';
import { myrouting } from './app.routing';
import { PedidoService } from '../../services/pedido.service';
import { ProdutoComponent } from '../produto/produto.component';
import { ProdutoService } from '../../services/produto.service';
import { FornecedorService } from '../../services/fornecedor.service';


@NgModule({
    declarations: [
        AppComponent,
        PedidoComponent,
        HeaderComponent,
        FornecedorComponent,
        ProdutoComponent
    ],
    imports: [BrowserModule, FormsModule, HttpClientModule, HttpModule, myrouting],
    providers: [PedidoService, FornecedorService, ProdutoService],
    bootstrap: [AppComponent]
})
export class AppModule {

}