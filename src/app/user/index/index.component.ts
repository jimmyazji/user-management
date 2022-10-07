import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [UserService]
})
export class IndexComponent implements OnInit {
  protected users: any[];
  constructor(private userService: UserService) { }
  getUsers() {
    this.users = this.userService.get();
    this.users.map(i => i.birthdayString = i.birthday.toISOString().substr(0, 10));
  }
  ngOnInit(): void {
    this.getUsers();
  }
}
