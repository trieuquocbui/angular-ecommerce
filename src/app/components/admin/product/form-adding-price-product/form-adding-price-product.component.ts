import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PriceModel } from 'src/app/models/price';
import { ProductModel } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-adding-price-product',
  templateUrl: './form-adding-price-product.component.html',
  styleUrls: ['./form-adding-price-product.component.css'],
})
export class FormAddingPriceProductComponent implements OnInit {
  message!: String;
  productId!: number;
  productModal!: ProductModel;
  priceList!: PriceModel[];

  iconDelete = faDeleteLeft;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['productId'];
    this.findProduct(this.productId);
    this.product = this.formBuilder.group({
      appliedDate: [null, Validators.required],
      newPrice: [null, Validators.required],
    });
  }

  product: FormGroup = new FormGroup({
    newPrice: new FormControl(null),
    appliedDate: new FormControl(null),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.product.controls;
  }

  findProduct(productId: number) {
    this.productService.findById(productId).subscribe((result) => {
      this.productModal = result;
    });

    this.productService.getPricesByProductId(productId).subscribe((result) => {
      this.priceList = result;
    });
  }

  checked(value: boolean, object: any, action: string) {
    if (value && action === '') {
      let price = new PriceModel();
      price.appliedDate = this.f['appliedDate'].value;
      price.newPrice = this.f['newPrice'].value;
      this.submitConfirm(price);
    } else if(value && action === 'delete'){
        this.submitDelete(object);
    }
  }

  submitConfirm(object: PriceModel) {
    this.productService
      .createPrice(object, this.productId)
      .subscribe((result) => {
        this.message = result.message!;
      });
      
  }

  submitDelete(object: PriceModel){
    this.productService
    .deletePrice(object, this.productId)
    .subscribe((result) => {
      this.message = result.message!;
    },error =>{
      this.message = error.error.message!;
    });
  }
}
