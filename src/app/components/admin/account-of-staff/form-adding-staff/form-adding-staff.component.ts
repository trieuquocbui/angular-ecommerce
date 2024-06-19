import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoleModel } from 'src/app/models/role';
import { Role } from 'src/app/models/role.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-adding-staff',
  templateUrl: './form-adding-staff.component.html',
  styleUrls: ['./form-adding-staff.component.css']
})
export class FormAddingStaffComponent implements OnInit {
  messageSuccess?: string;
  messageError?: string;

  roles:RoleModel[] = [
    {id:1,name:"ADMIN"},
    {id:2,name:"SALE"},
  ]

  constructor(private formBuilder: FormBuilder,private authService:AuthService) { }

  ngOnInit() {
    this.signup = this.formBuilder.group({
    username: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    identification: [null, Validators.required],
    birthDay: [null, Validators.required],
    role: [null, Validators.required],
    });
  }

  signup: FormGroup = new FormGroup({
    username: new FormControl(null),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    phoneNumber: new FormControl(null),
    identification: new FormControl(null),
    birthDay: new FormControl(null),
    role: new FormControl(null),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.signup.controls;
  }

 

  checked($event: boolean, arg1: null, arg2: string) {
    if ($event) {
     
      this.onSubmit(this.signup.value);
    } else {
      this.messageError = 'huỷ thành công';
    }
  }

  onSubmit(value: any) {
    this.authService.createStaff(value).subscribe(result =>{
      this.messageSuccess = result.message;
    },(error) =>{
      this.messageError = error.error.message;
    })
  }

}
