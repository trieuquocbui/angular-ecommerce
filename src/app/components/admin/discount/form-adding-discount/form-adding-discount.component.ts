import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DiscountModel } from 'src/app/models/discount';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-form-adding-discount',
  templateUrl: './form-adding-discount.component.html',
  styleUrls: ['./form-adding-discount.component.css'],
})
export class FormAddingDiscountComponent implements OnInit {
  discountModel!: DiscountModel;
  messageErrorName?: string;
  avatarFile!: File;
  messageSuccess?: string;
  action!: string;
  imageUrl!: string;
  messageErrorImage?: string;

  constructor(
    private formBuilder: FormBuilder,
    private discountService: DiscountService
  ) {}

  ngOnInit() {
    this.discount = this.formBuilder.group({
      id: [null, Validators.required],
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
      id: this.f['id'].value,
      reason: this.f['reason'].value,
      startDay: this.f['startDay'].value,
      endDay: this.f['endDay'].value,
      discountPercent: this.f['discountPercent'].value,
    };

    

    this.discountService.createDiscount(this.discountModel).subscribe(
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

  onKeydownName(event: any) {
    if (this.messageErrorName) {
      this.messageErrorName = undefined;
    }
  }

  checked($event: boolean, arg1: null, arg2: string) {
    if ($event) {
      this.onSubmit();
    } else {
      this.messageErrorName = 'huỷ thành công';
    }
  }
}
