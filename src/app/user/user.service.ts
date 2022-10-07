import { User } from './user';
import { Injectable } from '@angular/core';
const USERS = [
  {
    id: 1,
    firstName: 'Taylor',
    lastName: 'Jerrod',
    address: 'Bishkek, Kyrgyzstan',
    phone: '(515) 719-6444',
    birthday: new Date("2000-01-16")
  },
  {
    id: 2,
    firstName: 'Evalyn',
    lastName: 'Lucile',
    address: 'Liverpool, United Kingdom',
    phone: '(475) 789-5118',
    birthday: new Date("1993-09-12")
  },
  {
    id: 3,
    firstName: 'Charlotte',
    lastName: 'Florry',
    address: 'Mostar, Bosnia and Herzegovina',
    phone: '(311) 986-7184',
    birthday: new Date("1987-12-23")
  },
]
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  get(): User[] {
    return USERS;
  }
  add(data: User) {
    return new Promise(resolve => {
      USERS.unshift(data);
      resolve(data);
    });
  }
  getUser(id: number): User | undefined {
    return USERS.find(i => i.id == id);
  }
  put(changed: User) {
    return new Promise(resolve => {
      const index = USERS.findIndex(i => i.id == changed.id);
      USERS[index].firstName = changed.firstName;
      USERS[index].lastName = changed.lastName;
      USERS[index].address = changed.address;
      USERS[index].phone = changed.phone;
      USERS[index].birthday = changed.birthday;
      resolve(changed);
    });
  }
}
