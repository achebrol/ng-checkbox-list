import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';
import { BooleanCheckboxListComponent } from './boolean-checkbox-list/boolean-checkbox-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxListComponent,
    BooleanCheckboxListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
