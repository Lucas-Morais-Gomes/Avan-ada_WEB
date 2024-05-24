import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier.model';
import { CommonModule } from '@angular/common';
import { SupplierCreateComponent } from '../supplier-create/supplier-create.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, SupplierCreateComponent, ReactiveFormsModule],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  products: Product[] = [];
  suppliers: Supplier[] = [];
  editModalActive: boolean = false;
  selectedSupplier: Supplier | null = null;
  editSupplierForm: FormGroup;


  constructor(private supplierService: SupplierService, private productService: ProductService) {
    this.editSupplierForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")
      ]),
      cnpj: new FormControl('', [
        Validators.required,
        Validators.pattern("\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}")
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern("\\(\\d{2}\\) \\d{4,5}-\\d{4}")
      ]),
      product: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadProducts();
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


  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  addSupplierToList = (supplier: Supplier): void => {
    this.suppliers.push(supplier); 
  }

  deleteSupplier(id: string): void {
    this.supplierService.deleteSupplier(id).subscribe(() => {
      this.loadSuppliers();
    });
  }

  openEditModal(supplier: Supplier): void {
    this.selectedSupplier = supplier;
    this.editSupplierForm.patchValue({
      name: supplier.name,
      email: supplier.email,
      cnpj: supplier.cnpj,
      phone: supplier.phone,
      product: supplier.product
    });
    this.editModalActive = true;
  }


  closeEditModal(): void {
    this.selectedSupplier = null;
    this.editModalActive = false;
    this.editSupplierForm.reset();
  }

  saveChanges(): void {
    console.log('Tentando salvar mudanças...');
    console.log(this.editSupplierForm.value)
  
    const editedSupplier: Supplier = this.editSupplierForm.value;
    const id: string | undefined = this.selectedSupplier?._id;
  
    if (!id) {
      console.error('ID do fornecedor não encontrado.');
      return;
    }
  
    console.log('Enviando requisição para atualizar fornecedor...');
    this.supplierService.updateSupplier(id, editedSupplier).subscribe(() => {
      console.log('Fornecedor atualizado com sucesso.');
      this.loadSuppliers();
      this.closeEditModal();
    }, error => {
      console.error('Erro ao atualizar fornecedor:', error);
    });
  }
  
}
