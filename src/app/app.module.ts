import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeUsageComponent } from './page/code-usage/code-usage.component';
import { NumberPickerUsageComponent } from './page/number-picker-usage/number-picker-usage.component';


@NgModule({
  declarations: [
    AppComponent,
    NumberPickerComponent,
    CodeUsageComponent,
    NumberPickerUsageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
