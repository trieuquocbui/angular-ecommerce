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
import { map } from 'rxjs';
import { DiscountModel } from 'src/app/models/discount';
import { DiscountDetailsModel } from 'src/app/models/discountdetails';
import { ProductModel } from 'src/app/models/product';
import { ProductList } from 'src/app/models/productlist';
import { DiscountService } from 'src/app/services/discount.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form-updating-product-discount',
  templateUrl: './form-updating-product-discount.component.html',
  styleUrls: ['./form-updating-product-discount.component.css'],
})
export class FormUpdatingProductDiscountComponent implements OnInit {
  DiscountDetailsRequest?: DiscountDetailsModel;
  discountModel?: DiscountModel;
  message?: string;
  action!: string;
  discountId!: String;
  productList: ProductModel[] = [];
  selectProductList!: ProductList[];
  selectProducts: ProductModel[] = [];
  allProductsSelected: boolean = false;
  product: ProductModel | undefined;

  discountForm = this.formBuilder.group({
    products: this.formBuilder.array([]),
  });

  constructor(
    private discountService: DiscountService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.discountId = this.route.snapshot.params['discountId'];
    this.getProductList();
  }

  get products() {
    return this.discountForm.controls['products'] as FormArray;
  }

  onSubmit() {
    const list = this.discountForm.get('products')?.value as ProductList[];
    this.selectProductList = this.products.value;
    for (let i = 0; i < this.selectProductList.length; i++) {
      this.selectProducts.push(this.selectProductList[i].product!);
    }
    this.DiscountDetailsRequest = {
      products: this.selectProducts,
    };

    this.discountService
      .updateDiscountDetails(this.discountId, this.DiscountDetailsRequest)
      .subscribe(
        (result) => {
          this.message = result.message;
        },
        (error) => {
          this.message = error.error.message;
        }
      );
  }

  findDiscount(discountId: String) {
    this.discountService.getDiscountById(discountId).subscribe((result) => {
      this.discountModel = result;
      this.discountModel.discountDetails &&
        this.discountModel.discountDetails.forEach((element, index) => {
          const discountDetailsForm = this.formBuilder.group({
            product: [
              this.productList.find(item => item.id === element.product?.id),
              Validators.required,
            ],
          });
          this.products.push(discountDetailsForm);
        });
    });
  }

  getProductList() {
    this.productService
      .getAllProduct()
      .pipe(
        map((result) => {
          this.productList = result;
          return result;
        })
      )
      .subscribe((result) => {
        this.productList = result;
        this.findDiscount(this.discountId);
      });
  }

  checked($event: boolean, arg1: null, arg2: string) {
    if ($event) {
      this.onSubmit();
    } else {
      this.message = 'huỷ thành công';
    }
  }

  creDiscountDetails() {
    const discountDetailsForm = this.formBuilder.group({
      product: [null, Validators.required],
    });

    this.products.push(discountDetailsForm);
  }

  deDiscountDetails(index: number) {
    this.products.removeAt(index);
  }
}
