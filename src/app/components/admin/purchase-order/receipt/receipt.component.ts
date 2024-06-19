import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderModel } from 'src/app/models/purchar-order';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import { ReceiptService } from 'src/app/services/receipt.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit {
  purchaseOrder?: PurchaseOrderModel;
  message?: string;
  messageError?: string;
  orderId?: number;

  constructor(
    private router: Router,
    private purchase_orderService: PurchaseOrderService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private receiptService:ReceiptService
  ) {}

  ngOnInit() {
    this.receipt = this.formBuilder.group({
      id: [null, Validators.required],
      date: [null, Validators.required],
      order: [null, Validators.required],
      listReceiptDetail: this.formBuilder.array([], Validators.required),
    });
    this.orderId = this.route.snapshot.params['orderId'];
    this.orderId && this.getPurchaseOrderById(this.orderId);
  }

  receipt: FormGroup = new FormGroup({
    id: new FormControl(null),
    date: new FormControl(null),
    order: new FormControl(null),
    listReceiptDetail: this.formBuilder.array([]),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.receipt.controls;
  }

  get listReceiptDetail() {
    return this.receipt.controls['listReceiptDetail'] as FormArray;
  }

  getPurchaseOrderById(purchaseOrderId: Number) {
    this.purchase_orderService.findById(purchaseOrderId).subscribe((result) => {
      this.purchaseOrder = result;
      this.f['order'].setValue(this.purchaseOrder);
      this.purchaseOrder.orderDetails?.forEach((item) => {
        const receiptDetailsForm = this.formBuilder.group({
          product: [item.product, Validators.required],
          quantity: [null, Validators.required],
          price: [null, Validators.required],
        });
        this.listReceiptDetail.push(receiptDetailsForm);
      });
    });
  }

  checked($event: boolean, arg1: null, arg2: string) {
    if ($event) {
      this.onSubmit();
    } else {
      this.messageError = 'huỷ thành công';
    }
  }

  onSubmit() {
    console.log(this.receipt.value);
    this.receiptService.createReceipt(this.receipt.value).subscribe(result =>{
      this.message = result.message;
    })
  }
}
