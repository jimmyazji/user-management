import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  userForm: FormGroup;

  users: any[];

  submitted: boolean = false;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }
  addUser() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const newId = Math.max(...this.users.map(i => i.id)) + 1;
    this.userService.add({ id: newId, firstName: this.userForm.value.firstName, lastName: this.userForm.value.lastName, address: this.userForm.value.address, phone: this.userForm.value.phone, birthday: new Date(this.userForm.value.birthday) }).then(() => {
      this.getUsers();
    }).then(() => {
      this.router.navigate(['/users']);
    });
  }
  getUsers() {
    this.users = this.userService.get();
  }
  ngOnInit(): void {
    this.getUsers();
    this.userForm = this.formBuilder.group({
      firstName: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      lastName: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      address: [undefined, Validators.required],
      phone: [undefined, [Validators.required, Validators.minLength(12), Validators.maxLength(14)]],
      birthday: [undefined, [Validators.required]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
}
