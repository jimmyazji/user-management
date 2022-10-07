import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { UserService } from './user.service';
import { DynamicDateInputDirective } from './../dynamic-date-input.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndexComponent,
    EditComponent,
    CreateComponent,
    DynamicDateInputDirective,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, DatePipe],
})
export class UserModule { }
