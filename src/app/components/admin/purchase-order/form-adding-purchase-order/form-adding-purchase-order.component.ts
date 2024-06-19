import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigModel } from 'src/app/models/config';
import { ProductModel } from 'src/app/models/product';
import { PurchaseOrderModel } from 'src/app/models/purchar-order';
import { SupplierModel } from 'src/app/models/supplier';
import { ConfigService } from 'src/app/services/config.service';
import { ProductService } from 'src/app/services/product.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-form-adding-purchase-order',
  templateUrl: './form-adding-purchase-order.component.html',
  styleUrls: ['./form-adding-purchase-order.component.css']
})
export class FormAddingPurchaseOrderComponent implements OnInit {
  supplierList?:SupplierModel[];
  productList!:ProductModel[];
  messageError?: string;
  message?: string;


  constructor(
    private formBuilder: FormBuilder,
    private supplierService:SupplierService,
    private productService:ProductService,
    private purchaseOrderService:PurchaseOrderService
  ) {}

  ngOnInit() {
    this.purchaseOrder = this.formBuilder.group({
      date: [null, Validators.required],
      supplier: [null, Validators.required],
      orderDetails: this.formBuilder.array([])
    });
    this.getAllSupplier();
    this.getProductList();
  }

  purchaseOrder: FormGroup = new FormGroup({
    date: new FormControl(null),
    supplier: new FormControl(null),
    orderDetails: this.formBuilder.array([]),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.purchaseOrder.controls;
  }

  get orderDetails() {
    return this.purchaseOrder.controls["orderDetails"] as FormArray;
  }

  creDiscountDetails(){
    const orderDetailsForm = this.formBuilder.group({
      product:[null,Validators.required],
      quantity:[null,Validators.required],
      price:[null,Validators.required]
    })

    this.orderDetails.push(orderDetailsForm);
  }

  getAllSupplier(){
    this.supplierService.getAllSupplier().subscribe(result =>{
      this.supplierList = result;
    })
  }

  deDiscountDetails(index: number) {
    this.orderDetails.removeAt(index);
  }

  getProductList(){
    this.productService.getAllProduct().subscribe(result =>{
      this.productList = result;
    })
  }
  
  checked($event: boolean, arg1: null, arg2: string) {
    if ($event) {
      this.onSubmit();
    } else {
      this.messageError = 'huỷ thành công';
    }
  }

  onSubmit() {
    this.purchaseOrderService.createPurchaseOrder(this.purchaseOrder.value).subscribe(result =>{
      this.message = result.message;
    })
  }

}
