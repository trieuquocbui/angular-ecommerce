import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Cart_Item from 'src/app/models/cartItem';
import { ProductModel } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details_product',
  templateUrl: './details_product.component.html',
  styleUrls: ['./details_product.component.css'],
})
export class DetailsProductComponent implements OnInit {
  facompare = faCirclePlus;
  product?: ProductModel;
  cartItem!: Cart_Item;
  ImageUrl: string = 'http://localhost:8080/image/';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.params['productId'];
    this.getProductById(productId);
  }

  getProductById(productId: number) {
    this.productService.getProductById(productId).subscribe(
      (result) => {
        this.product = result;
      },
      (error) => {}
    );
  }

  onAddIntoCart(productId?: number) {
    let product: ProductModel;
    productId &&
      this.productService.getProductById(productId).subscribe((result) => {
        this.product = result;
      });

    let price:number = 0;
    if(this.product?.rate == 0){
        price = this.product?.price!;
    } else {
      price = (this.product?.price! - (this.product?.price! / this.product?.rate!));
    }
    this.cartItem = {
      product: this.product,
      quantity: 1,
      //price: this.product?.price,
      select: false,
      totalPay: price
    };

    this.cartService.saveProductsIntoCart(this.cartItem);
    this.router.navigate(['cart']);
  }
}
