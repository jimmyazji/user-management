import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UserService } from './../user.service';
import { User } from '../user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService],
})
export class EditComponent implements OnInit {
  protected user: User | undefined;
  protected userForm: FormGroup
  protected submitted: boolean = false;
  private userId: any;
  protected changedUser: User;
  constructor(private userService: UserService, private route: ActivatedRoute, protected router: Router, private formBuilder: FormBuilder) { }

  getUser(): void {
    this.user = this.userService.getUser(this.userId)
  }
  putUser(): void {
    this.submitted = true;
    if (this.userForm.invalid) { return }
    this.changedUser = { id: this.userId, firstName: this.userForm.value.firstName, lastName: this.userForm.value.lastName, address: this.userForm.value.address, phone: this.userForm.value.phone, birthday: new Date(this.userForm.value.birthday) }
    this.userService.put(this.changedUser).then(() => {
      this.router.navigate(['/users']);
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [this.user?.firstName, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      lastName: [this.user?.lastName, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      address: [this.user?.address, Validators.required],
      phone: [this.user?.phone, [Validators.required, Validators.minLength(12), Validators.maxLength(14)]],
      birthday: [this.user?.birthday, [Validators.required]]
    });
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
    this.getUser();
    this.userForm.setValue({ firstName: this.user?.firstName, lastName: this.user?.lastName, address: this.user?.address, phone: this.user?.phone, birthday: this.user?.birthday.toISOString().substr(0, 10) })
  }
}
