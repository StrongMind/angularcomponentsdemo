import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'strongmind-number-picker',
  template: `
    <span [ngClass]="numberPickerOptions.pickerCss">
        <span class="input-group-btn">
            <button class="sm-number-picker-decrement" [ngClass]="numberPickerOptions.buttonCss" (click)="decreaseValue()">
                    <span *ngIf="!numberPickerOptions.buttonIconDecrease">-</span>
                    <span *ngIf="numberPickerOptions.buttonIconDecrease"><i [ngClass]="numberPickerOptions.buttonIconDecrease"></i></span>
            </button>
        </span>
        <input type="text" class="form-control text-center" [(ngModel)]="pickerValue" [style.max-width.px]="numberPickerOptions.inputWidth"
            [class.validation-error]="numberPickerOptions.showValidation && numberPickerOptions.getErrors().length > 0" [class.input-disabled]="numberPickerOptions.inputDisabled"
            (blur)="onBlur($event)" (keydown)="keydown($event)" (keypress)="keypress($event)" [disabled]="numberPickerOptions.inputDisabled"/>	
        <span class="input-group-btn">
            <button class="sm-number-picker-increment" [ngClass]="numberPickerOptions.buttonCss" (click)="increaseValue()">
                <span *ngIf="!numberPickerOptions.buttonIconIncrease">+</span>
                <span *ngIf="numberPickerOptions.buttonIconIncrease"><i [ngClass]="numberPickerOptions.buttonIconIncrease"></i></span>
            </button>
        </span>
        </span>
        <div *ngIf="numberPickerOptions.showValidation" class="validation-error-container">
        <span class="validation-error-message" *ngFor="let error of numberPickerOptions.getErrors()">
            {{error}}
        </span>
    </div>`,
  styles: [
    `.input-group-btn:not(:last-child) > .btn, .input-group-btn:not(:last-child) > .btn-group {
            margin-right: 0px;
        }
        .input-group-btn:not(:first-child) > .btn:first-child, .input-group-btn:not(:first-child) > .btn-group:first-child {
            margin-left: 0px;
        }
        .input-disabled {
            background-color: #e1e1e1;
        }
        .form-control:focus {
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .btn-secondary {
            color: #005888;
            background-color: #fff;
            border-color: #ccc;
        }
        .btn-secondary:focus, .btn-secondary.focus {
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .btn.btn-secondary:hover {
          cursor: pointer;
          background-color: #e1e1e1;
        }
        .validation-error-container {
          font-size: 0.75em;
        }
        .validation-error {
            border-color: #d62828;
            background-color: #f8dede;
        }
        .validation-error-message {
            color: #a94442;
        }`
  ]
})
export class NumberPickerComponent implements OnInit {
  private _pickerValue: any = 0;
  // onChange event
  @Output() pickerValueChange = new EventEmitter();

  // numberpicker options input
  @Input() numberPickerOptions: NumberPickerOption;
  @Input()
  get pickerValue() {
    return this._pickerValue;
  }

  set pickerValue(val) {
    this._pickerValue = val;
    this.pickerValueChange.emit(this._pickerValue);
  }

  // variable to track the last valid value of the numberpicker
  private latestValue: number;

  // init
  ngOnInit() {
    // if not type 'NumberPickerOption', create new instance
    if (!(this.numberPickerOptions instanceof NumberPickerOption)) {
      this.numberPickerOptions = new NumberPickerOption(this.numberPickerOptions);
    }

    // set latest value on init
    this.latestValue = this.pickerValue;
  }

  // function to increase value of the component
  public increaseValue(): void {
    if (this.numberPickerOptions.inputDisabled) {
      return;
    }

    var currentValue = Number(this.pickerValue);

    if ((this.pickerValue === null || this.pickerValue === "") &&
      ((this.numberPickerOptions.max < 0 && this.numberPickerOptions.min < 0) || (this.numberPickerOptions.max > 0 && this.numberPickerOptions.min > 0))) {
      currentValue = this.numberPickerOptions.min;
    }

    if ((currentValue + this.numberPickerOptions.step) <= this.numberPickerOptions.max) {
      let mod = (Math.abs(currentValue) + this.numberPickerOptions.step) % this.numberPickerOptions.step;

      if (mod == 0) {
        currentValue = currentValue + this.numberPickerOptions.step;
      } else {
        currentValue = currentValue + (this.numberPickerOptions.step - mod);
      }
      currentValue = this.round(currentValue, this.numberPickerOptions.getPrecision());

      this.pickerValue = currentValue;
      this.numberPickerOptions.isValid(this.pickerValue);
    }
  }

  // function to decrease value of the component
  public decreaseValue(): void {
    if (this.numberPickerOptions.inputDisabled) {
      return;
    }

    var currentValue = Number(this.pickerValue);

    if ((this.pickerValue === null || this.pickerValue === "") &&
      ((this.numberPickerOptions.max < 0 && this.numberPickerOptions.min < 0) || (this.numberPickerOptions.max > 0 && this.numberPickerOptions.min > 0))) {
      currentValue = this.numberPickerOptions.min + this.numberPickerOptions.step;
    }

    if ((currentValue - this.numberPickerOptions.step) >= this.numberPickerOptions.min) {
      let mod = (Math.abs(currentValue) + this.numberPickerOptions.step) % this.numberPickerOptions.step;

      if (mod == 0) {
        currentValue = currentValue - this.numberPickerOptions.step;
      } else {
        currentValue = currentValue - mod;
      }
      currentValue = this.round(currentValue, this.numberPickerOptions.getPrecision());

      this.pickerValue = currentValue;
      this.numberPickerOptions.isValid(this.pickerValue);
    }
  }

  // function to capture arrow key events from the client
  public keydown($event: KeyboardEvent): boolean {
    let key = $event.keyCode;

    if (($event.ctrlKey && $event.shiftKey) || $event.shiftKey) {
      return true;
    }

    if (key === 38 || key === 39) { // right arrow or up arrow
      $event.preventDefault();
      this.increaseValue();
      return false;
    } else if (key === 40 || key === 37) { // left arrow or down arrow
      $event.preventDefault();
      this.decreaseValue();
      return false;
    }

    return true;
  }

  // function to capture key events from the client
  public keypress($event: KeyboardEvent): boolean {
    let keyList = [8, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]; // backspace/delete, dash/subtract, 0-9 (decimal keycode: 46 not yet supported)
    let key = $event.keyCode;

    if (keyList.indexOf(key) <= 0) {
      $event.preventDefault();

      return false;
    }

    return true;
  }

  public onBlur($event: Event) {
    let isNull = this.pickerValue == "" && this.numberPickerOptions.acceptNull;
    if (isNull) {
      this.setValueChanges(null);
    }

    if (this.numberPickerOptions.showValidation) {
      // set latest value, and send changes
      this.setValueChanges(this.pickerValue);
    }

    var isValid = this.numberPickerOptions.isValid(this.pickerValue);
    if (!isValid && !this.numberPickerOptions.showValidation) {
      this.pickerValue = this.latestValue;
    } else {
      // set latest value, and send changes
      this.setValueChanges(this.pickerValue);
    }

    return false;
  }

  private round(value: number, precision: number): number {
    let multiplier: number = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  // set latest value, and send changes
  private setValueChanges(value: any): void {
    let valueInt: number = Number.parseInt(value.toString());
    this.pickerValue = isNaN(valueInt) ? value : valueInt;
    this.latestValue = this.pickerValue;
  }
}

export class NumberPickerOption {
  min: number = 0;
  max: number = 100;
  step: number = 1;
  acceptNull: boolean = false;
  showValidation: boolean = true;
  showAllErrors: boolean = false;
  pickerCss: string = 'input-group';
  buttonCss: string = 'btn btn-secondary';
  buttonIconDecrease: string = null;
  buttonIconIncrease: string = null;
  errorMessages: NumberPickerErrorMessage = {
    invalidNumber: 'Invalid Number',
    invalidMin: 'Invalid min value',
    invalidMax: 'Invalid max value',
    invalidStep: 'Invalid step value',
    invalidEmpty: 'Value cannot be empty'
  };
  inputDisabled: boolean = false;
  inputWidth?: Number = null;


  // custom precision not supported yet
  private precision: number = 1;
  // errors collection for display
  private errors: string[] = [];

  constructor(init?: Partial<NumberPickerOption>) {
    Object.assign(this, init);
  }

  // check if object is valid
  isValid(value): boolean {
    let numberValue = Number(value);
    let isValid = true;
    let isNullable = value === "" && this.acceptNull;

    this.errors = [];
    if (isNaN(numberValue)) {
      this.errors.push(this.errorMessages.invalidNumber);
      isValid = false;
    }
    // input is lower than minimum value
    if (numberValue < this.min && !isNullable) {
      this.errors.push(this.errorMessages.invalidMin + ' (' + this.min + ')');
      isValid = false;
    }
    // input is higher than maximum value
    if (numberValue > this.max && !isNullable) {
      this.errors.push(this.errorMessages.invalidMax + ' (' + this.max + ')');
      isValid = false;
    }
    // input is not a valid step value
    if (numberValue % this.step != 0) {
      this.errors.push(this.errorMessages.invalidStep + ' (' + this.step + ')');
      isValid = false;
    }
    // input is empty and is not excepted
    if (value === "" && !this.acceptNull) {
      this.errors.push(this.errorMessages.invalidEmpty);
      isValid = false;
    }

    return isValid;
  }

  // get picker errors
  getErrors(): string[] {
    return this.showAllErrors || this.errors.length == 0 ? this.errors : [this.errors[0]]; // due to real-estate, we may not want to show all errors
  }
  getPrecision() {
    return this.precision;
  }

  getStyle() {
    return this.inputWidth == null ? null : 'width:' + this.inputWidth + 'px;';
  }

  clearErrors() {
    this.errors = []; // if programmically needing to clear errors
  }

}

export class NumberPickerErrorMessage {
  invalidNumber: string = 'Invalid Number';
  invalidMin: string = 'Invalid min value';
  invalidMax: string = 'Invalid max value';
  invalidStep: string = 'Invalid step value';
  invalidEmpty: string = 'Value cannot be empty';

  constructor(init?: Partial<NumberPickerErrorMessage>) {
    Object.assign(this, init);
  }
}
