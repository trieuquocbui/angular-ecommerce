import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DiscountModel } from 'src/app/models/discount';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-form-updating-discount',
  templateUrl: './form-updating-discount.component.html',
  styleUrls: ['./form-updating-discount.component.css']
})
export class FormUpdatingDiscountComponent implements OnInit {
  discountModel!: DiscountModel;
  messageErrorName?: string;
  messageSuccess?: string;
  action!: string;
  discountId!: String;
  messageErrorImage?: string;

  constructor(
    private formBuilder: FormBuilder,
    private discountService: DiscountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.discountId = this.route.snapshot.params['discountId'];
    this.findDiscount(this.discountId);
    this.discount = this.formBuilder.group({
      id: [{value: null, disabled: true}, Validators.required],
      reason: [null, Validators.required],
      startDay: [null, Validators.required],
      endDay: [null, Validators.required],
      discountPercent: [null, Validators.required],
    });
  }

  discount: FormGroup = new FormGroup({
    id: new FormControl(null),
    reason: new FormControl(null),
    startDay: new FormControl(null),
    endDay: new FormControl(null),
    discountPercent: new FormControl(null),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.discount.controls;
  }

  onSubmit() {
    this.discountModel = {
      id:this.f['id'].value,
      reason: this.f['reason'].value,
      startDay: this.f['startDay'].value,
      endDay: this.f['endDay'].value,
      discountPercent: this.f['discountPercent'].value,
    };

    console.log(this.discountModel);

    this.discountService.updateDiscount(this.discountModel).subscribe(
      (result) => {
        this.messageSuccess = result.message;
        console.log(this.messageSuccess);
        setTimeout(() => {
          this.messageSuccess = undefined;
        }, 3000);
      },
      (error) => {
        this.messageErrorName = error.error.message;
        setTimeout(() => {
          this.messageSuccess = undefined;
        }, 3000);
      }
    );
  }

  findDiscount(discountId: String) {
    this.discountService.getDiscountById(discountId).subscribe((result) => {
      this.discountModel = result;

      this.f['id'].setValue(this.discountModel.id);
      this.f['reason'].setValue(this.discountModel.reason);
      this.f['startDay'].setValue(this.discountModel.startDay);
      this.f['endDay'].setValue(this.discountModel.endDay);
      this.f['discountPercent'].setValue(this.discountModel.discountPercent);
    });
  }

  onKeydownName(event: any) {
    if (this.messageErrorName) {
      this.messageErrorName = undefined;
    }
  }

  checked($event: boolean, arg1: null, arg2: string) {
    if ($event) {
      this.onSubmit();
    } else {
      this.messageSuccess = 'huỷ thành công';
    }
  }

}
