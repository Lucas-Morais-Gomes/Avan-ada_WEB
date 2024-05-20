import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FornecedorService } from '../../services/fornecedor.service';

@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.css']
})

export class ClienteComponent implements OnInit {
    ClienteArray: any[] = [];
    FornecedorArray: any[] = [];
    currentClienteID = "";
    name: string = "";
    address: string = "";
    phone: string = "";
    fornecedor: string = "";

    constructor(private clienteService: ClienteService, private fornecedorService: FornecedorService) { }

    ngOnInit() {
        this.getAllCliente();
        this.fornecedorService.getAllFornecedors().subscribe((data: any) => {
            this.FornecedorArray = data;
        });
      
    }

    getAllCliente() {
        this.clienteService.getAllClientes().subscribe((resultData: any) => {
            console.log(resultData);
            this.ClienteArray = resultData;
        });
    }

    setUpdate(data: any) {
        this.name = data.name;
        this.address = data.address;
        this.phone = data.phone;
        this.fornecedor = data.fornecedor,
        this.currentClienteID = data._id;
    }

    updateRecords() {
        let bodyData = {
            "name": this.name,
            "address": this.address,
            "phone": this.phone,
            "fornecedor": this.fornecedor
        };

        this.clienteService.updateCliente(this.currentClienteID, bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Cliente atualizado.');
            this.currentClienteID = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.fornecedor = '';
            this.getAllCliente();
        });
    }

    setDelete(data: any) {
        this.clienteService.deleteCliente(data._id).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Cliente deletado.');
            this.getAllCliente();
        });
    }

    save() {
        if (this.currentClienteID == '') {
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
            "fornecedor": this.fornecedor
        };

        this.clienteService.createCliente(bodyData).subscribe((resultData: any) => {
            console.log(resultData);
            alert('Cliente criado com sucesso.');
            this.currentClienteID = '';
            this.name = '';
            this.address = '';
            this.phone = '';
            this.fornecedor = '';
            this.getAllCliente();
        });
    }
}