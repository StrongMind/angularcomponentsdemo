import { NgModule } from '@angular/core';
import { NumberPickerComponent } from './number-picker/number-picker.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NumberPickerComponent],
    exports: [NumberPickerComponent],
})
export class StrongmindComponentSuiteModule { }
