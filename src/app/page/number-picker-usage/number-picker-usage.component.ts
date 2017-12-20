import { Component, OnInit } from '@angular/core';
import { NumberPickerOption, NumberPickerErrorMessage } from '../../components/number-picker/number-picker.component';

@Component({
  selector: 'app-number-picker-usage',
  templateUrl: './number-picker-usage.component.html',
  styleUrls: ['./number-picker-usage.component.css']
})
export class NumberPickerUsageComponent implements OnInit {
  pickerValue1: Number = 0;
  pickerValue2: any = 14;

  pickerValue3: Number = 264;
  pickerValue4: any = null;
  pickerOptions4: NumberPickerOption = new NumberPickerOption({ 
    min: 5, 
    max: 1000, 
    step: 5, 
    acceptNull: true,
    inputWidth: 75,
    buttonIconIncrease: 'fa fa-plus',
    buttonIconDecrease: 'fa fa-minus',
    errorMessages: new NumberPickerErrorMessage({ 
      invalidMax: "Whoa! That's a large #"
    }) 
  });

  constructor() { }

  ngOnInit() {
  }

}
