import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PaginationComponent
  ],
  exports: [
    CommonModule,
    PaginationComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
