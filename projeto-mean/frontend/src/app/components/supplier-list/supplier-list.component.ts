import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier.model';
import { CommonModule } from '@angular/common';
import { SupplierCreateComponent } from '../supplier-create/supplier-create.component';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, SupplierCreateComponent],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(
      suppliers => {
        this.suppliers = suppliers;
        console.log(suppliers)
      },
      error => {
        console.error('Erro ao carregar fornecedores:', error);
      }
    );
  }


  addSupplierToList = (supplier: Supplier): void => {
    this.suppliers.push(supplier); // Adicionar o novo fornecedor ao array local
  };

  deleteSupplier(id: string): void {
    this.supplierService.deleteSupplier(id).subscribe(() => {
      this.loadSuppliers();
    });
  }
}
