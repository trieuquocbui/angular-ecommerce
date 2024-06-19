import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SupplierModel } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-form-updating-supplier',
  templateUrl: './form-updating-supplier.component.html',
  styleUrls: ['./form-updating-supplier.component.css']
})
export class FormUpdatingSupplierComponent implements OnInit {
  supplierId?:string;
  supplierModel?:SupplierModel;
  messageError?: string;
  message?: string;

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.supplierId = this.route.snapshot.params['supplierId'];
    this.findById(this.supplierId!);
    this.supplier = this.formBuilder.group({
      name: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
      status: [null],
    });
  }

  supplier: FormGroup = new FormGroup({
    name: new FormControl(null),
    phoneNumber: new FormControl(null),
    address: new FormControl(null),
    status: new FormControl(true),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.supplier.controls;
  }

  checked($event: boolean, arg1: null, arg2: string) {
    if ($event) {
      this.onSubmit();
    } else {
      this.messageError = 'huỷ thành công';
    }
  }

  findById(supplierId:string){
      this.supplierService.findById(supplierId).subscribe( (result)  =>{
        this.f['name'].setValue(result.name);
        this.f['address'].setValue(result.address);
        this.f['phoneNumber'].setValue(result.phoneNumber);
        this.f['status'].setValue(result.status);
      })
  }

  onSubmit() {
    let supplier = new SupplierModel();
    supplier.name = this.f["name"].value;
    supplier.address = this.f['address'].value;
    supplier.phoneNumber = this.f['phoneNumber'].value;
    supplier.status = this.f['status'].value;
    this.supplierService.updateSupplier(this.supplierId,supplier).subscribe(
      (result) => {
        this.message = result.message;
        setTimeout(() => {
          this.message = undefined
        }, 3000);
      },
      (error) => {
        this.message = error.error.message;
        setTimeout(() => {
          this.message = undefined
        }, 3000);
        
      }
    );
  }

}
