import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/helpers/appconstant';
import { AccountModel } from 'src/app/models/account';
import { RoleModel } from 'src/app/models/role';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-form-updating-staff',
  templateUrl: './form-updating-staff.component.html',
  styleUrls: ['./form-updating-staff.component.css']
})
export class FormUpdatingStaffComponent implements OnInit {
  messageSuccess?: string;
  messageError?: string;
  accountId?:number;

  accountModel!:AccountModel;

  roles:RoleModel[] = [
    {id:1,name:"ADMIN"},
    {id:3,name:"SALE"},
  ]

  constructor(private formBuilder: FormBuilder,private accountService:AccountService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.accountId = this.route.snapshot.params['accountId'];
    this.findAccountById(this.accountId!);
    this.account = this.formBuilder.group({
      role: [null, Validators.required],
      });
  }

  account: FormGroup = new FormGroup({
    role: new FormControl(null),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.account.controls;
  }

  findAccountById(accountId:number){
    this.accountService.getAccountById(accountId).subscribe((result) => {
      this.accountModel = result;
      this.f['role'].setValue(this.roles.find(item => item.name == result.role?.name));
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
    this.accountModel.role = this.f['role'].value;
    this.accountService.updateAccount(this.accountModel).subscribe(result =>{
      this.messageSuccess = AppConstants.UPDATE_SUCCESS;
    },(error) =>{
      this.messageError = error.error.message;
    })
  }

}
