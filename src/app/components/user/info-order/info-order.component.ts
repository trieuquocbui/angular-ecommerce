import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { District } from 'src/app/models/district';
import { MessageModel } from 'src/app/models/message';
import OrderModel from 'src/app/models/bill';
import { Province } from 'src/app/models/province';
import Ward from 'src/app/models/ward';
import { CartService } from 'src/app/services/cart.service';
import { UtilsService } from 'src/app/services/utils.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-info-order',
  templateUrl: './info-order.component.html',
  styleUrls: ['./info-order.component.css']
})
export class InfoOrderComponent implements OnInit{
  
  isSubmitted = false;
  provinces?:Province[];
  districts?:District[];
  wards?:Ward[];
  addressHome?:string;

  message?:String;

  constructor(private router:Router,private formBuilder: FormBuilder,private utilsAddress:UtilsService,private cartService:CartService){}

  ngOnInit(): void {
    this.getProvience();

    this.inforOrder = this.formBuilder.group({
      province: [null, Validators.required],
      district: [null, Validators.required],
      ward: [null, Validators.required],
      addressHome: [null, Validators.required],
      note: [null],
    });
  }

  inforOrder:FormGroup = new FormGroup({
    province: new FormControl(null),
    district: new FormControl(null),
    ward: new FormControl(null),
    addressHome: new FormControl(null),
    note: new FormControl(null),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.inforOrder.controls;
  }

  getProvience(){
    this.utilsAddress.getProvinces().subscribe((data) =>{
      this.provinces = Object.values(data)[0];
    })
  }

  changeProvince($event: any) {
   let province:Province = this.f['province'].value;
   this.utilsAddress.getCities(province.province_id!).subscribe((data) =>{
      this.districts = Object.values(data)[0];
   })
  }

  changeCity($event: any) {
    let district:District = this.f['district'].value;
    this.utilsAddress.getWards(district.district_id!).subscribe((data) =>{
      this.wards = Object.values(data)[0];
   })
  }

  changeWard($event: any) {
    let ward = this.f['ward'].value;
  }

  onSubmit(){
    this.isSubmitted = true;
    let province:Province = this.inforOrder.get('province')?.value;
    let district:District = this.inforOrder.get('district')?.value;
    let ward:Ward = this.inforOrder.get('ward')?.value;
    let addressHome:string = this.inforOrder.get('addressHome')?.value;
    let note:string = this.inforOrder.get('note')?.value;
    this.cartService.submitOrder(province.province_name!,district.district_name!,ward.ward_name!,addressHome,note).subscribe((data:MessageModel) =>{
          this.message = data.message!;
    })

    setTimeout(() =>{
      this.message = undefined;
    },2000);

    this.router.navigate(['order/list']);
  }


}
