import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { ProdutoService } from '../../services/produto.service';


@Component({
    selector: 'app-pedido',
    templateUrl: './pedido.component.html',
    styleUrls: ['./pedido.component.css']
})

export class PedidoComponent implements OnInit {
    PedidoArray: any[] = [];
    ProdutoArray: any[] = [];
    currentPedidoID = "";
    name: string = "";
    address: string = "";
    phone: string = "";
    produto: string = "";

    constructor(private pedidoService: PedidoService, private produtoService: ProdutoService) { }

    ngOnInit() {
        this.getAllPedido();
        this.produtoService.getAllProdutos().subscribe((data: any) => {
            this.ProdutoArray = data;
        });
      
    }

    getAllPedido() {
        this.pedidoService.getAllPedidos().subscribe((resultData: any) => {
            console.log(resultData);
            this.PedidoArray = resultData;
            console.log(resultData);
        });
    }

    setUpdate(data: any) {
        this.name = data.name;
        this.address = data.address;
        this.phone = data.phone;
        this.produto = data.produto,
        this.currentPedidoID = data._id;
    }

    updateRecords() {
        let bodyData = {
            "name": this.name,
            "address": this.address,
            "phone": this.phone,
            "produto": this.produto
        };

        this.pedidoService.updatePedido(this.currentPedidoID, bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Pedido atualizado.');
            this.currentPedidoID = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.produto = '';
            this.getAllPedido();
        });
    }

    setDelete(data: any) {
        this.pedidoService.deletePedido(data._id).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Pedido deletado.');
            this.getAllPedido();
        });
    }

    save() {
        if (this.currentPedidoID == '') {
            this.register();
        }
        else {
            this.updateRecords();
        }
    }

    register() {
        let bodyData = {
            "name": this.name,
            "address": this.address,
            "phone": this.phone,
            "produto": this.produto
        };

        this.pedidoService.createPedido(bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Pedido criado com sucesso.');
            this.currentPedidoID = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.produto = '';
            this.getAllPedido();
        });
    }
}