import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavedPipe } from './pipes/faved.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [FavedPipe],
  exports: [
    TimeagoModule, FavedPipe, FormsModule, ReactiveFormsModule
  ]
})
export class SharedModule { }
