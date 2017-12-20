"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NumberPickerComponent = (function () {
    function NumberPickerComponent() {
        this._pickerValue = 0;
        // onChange event
        this.pickerValueChange = new core_1.EventEmitter();
    }
    Object.defineProperty(NumberPickerComponent.prototype, "pickerValue", {
        get: function () {
            return this._pickerValue;
        },
        set: function (val) {
            this._pickerValue = val;
            this.pickerValueChange.emit(this._pickerValue);
        },
        enumerable: true,
        configurable: true
    });
    // init
    NumberPickerComponent.prototype.ngOnInit = function () {
        // if not type 'NumberPickerOption', create new instance
        if (!(this.numberPickerOptions instanceof NumberPickerOption)) {
            this.numberPickerOptions = new NumberPickerOption(this.numberPickerOptions);
        }
        // set latest value on init
        this.latestValue = this.pickerValue;
    };
    // function to increase value of the component
    NumberPickerComponent.prototype.increaseValue = function () {
        if (this.numberPickerOptions.inputDisabled) {
            return;
        }
        var currentValue = Number(this.pickerValue);
        if ((this.pickerValue === null || this.pickerValue === "") &&
            ((this.numberPickerOptions.max < 0 && this.numberPickerOptions.min < 0) || (this.numberPickerOptions.max > 0 && this.numberPickerOptions.min > 0))) {
            currentValue = this.numberPickerOptions.min;
        }
        if ((currentValue + this.numberPickerOptions.step) <= this.numberPickerOptions.max) {
            var mod = (Math.abs(currentValue) + this.numberPickerOptions.step) % this.numberPickerOptions.step;
            if (mod == 0) {
                currentValue = currentValue + this.numberPickerOptions.step;
            }
            else {
                currentValue = currentValue + (this.numberPickerOptions.step - mod);
            }
            currentValue = this.round(currentValue, this.numberPickerOptions.getPrecision());
            this.pickerValue = currentValue;
            this.numberPickerOptions.isValid(this.pickerValue);
        }
    };
    // function to decrease value of the component
    NumberPickerComponent.prototype.decreaseValue = function () {
        if (this.numberPickerOptions.inputDisabled) {
            return;
        }
        var currentValue = Number(this.pickerValue);
        if ((this.pickerValue === null || this.pickerValue === "") &&
            ((this.numberPickerOptions.max < 0 && this.numberPickerOptions.min < 0) || (this.numberPickerOptions.max > 0 && this.numberPickerOptions.min > 0))) {
            currentValue = this.numberPickerOptions.min + this.numberPickerOptions.step;
        }
        if ((currentValue - this.numberPickerOptions.step) >= this.numberPickerOptions.min) {
            var mod = (Math.abs(currentValue) + this.numberPickerOptions.step) % this.numberPickerOptions.step;
            if (mod == 0) {
                currentValue = currentValue - this.numberPickerOptions.step;
            }
            else {
                currentValue = currentValue - mod;
            }
            currentValue = this.round(currentValue, this.numberPickerOptions.getPrecision());
            this.pickerValue = currentValue;
            this.numberPickerOptions.isValid(this.pickerValue);
        }
    };
    // function to capture arrow key events from the client
    NumberPickerComponent.prototype.keydown = function ($event) {
        var key = $event.keyCode;
        if (($event.ctrlKey && $event.shiftKey) || $event.shiftKey) {
            return true;
        }
        if (key === 38 || key === 39) {
            $event.preventDefault();
            this.increaseValue();
            return false;
        }
        else if (key === 40 || key === 37) {
            $event.preventDefault();
            this.decreaseValue();
            return false;
        }
        return true;
    };
    // function to capture key events from the client
    NumberPickerComponent.prototype.keypress = function ($event) {
        var keyList = [8, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]; // backspace/delete, dash/subtract, 0-9 (decimal keycode: 46 not yet supported)
        var key = $event.keyCode;
        if (keyList.indexOf(key) <= 0) {
            $event.preventDefault();
            return false;
        }
        return true;
    };
    NumberPickerComponent.prototype.onBlur = function ($event) {
        var isNull = this.pickerValue == "" && this.numberPickerOptions.acceptNull;
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
        }
        else {
            // set latest value, and send changes
            this.setValueChanges(this.pickerValue);
        }
        return false;
    };
    NumberPickerComponent.prototype.round = function (value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    };
    // set latest value, and send changes
    NumberPickerComponent.prototype.setValueChanges = function (value) {
        this.latestValue = value;
    };
    return NumberPickerComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NumberPickerComponent.prototype, "pickerValueChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", NumberPickerOption)
], NumberPickerComponent.prototype, "numberPickerOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NumberPickerComponent.prototype, "pickerValue", null);
NumberPickerComponent = __decorate([
    core_1.Component({
        selector: 'sm-angular-number-picker',
        templateUrl: './number-picker.component.html',
        styleUrls: ['./number-picker.component.css']
    })
], NumberPickerComponent);
exports.NumberPickerComponent = NumberPickerComponent;
var NumberPickerOption = (function () {
    function NumberPickerOption(init) {
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.acceptNull = false;
        this.showValidation = true;
        this.showAllErrors = false;
        this.pickerCss = 'input-group';
        this.buttonCss = 'btn btn-secondary';
        this.buttonIconDecrease = null;
        this.buttonIconIncrease = null;
        this.errorMessages = {
            invalidNumber: 'Invalid Number',
            invalidMin: 'Invalid min value',
            invalidMax: 'Invalid max value',
            invalidStep: 'Invalid step value',
            invalidEmpty: 'Value cannot be empty'
        };
        this.inputDisabled = false;
        this.inputWidth = null;
        // custom precision not supported yet
        this.precision = 1;
        // errors collection for display
        this.errors = [];
        Object.assign(this, init);
    }
    // check if object is valid
    NumberPickerOption.prototype.isValid = function (value) {
        var numberValue = Number(value);
        var isValid = true;
        var isNullable = value === "" && this.acceptNull;
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
    };
    // get picker errors
    NumberPickerOption.prototype.getErrors = function () {
        return this.showAllErrors || this.errors.length == 0 ? this.errors : [this.errors[0]]; // due to real-estate, we may not want to show all errors
    };
    NumberPickerOption.prototype.getPrecision = function () {
        return this.precision;
    };
    NumberPickerOption.prototype.getStyle = function () {
        return this.inputWidth == null ? null : 'width:' + this.inputWidth + 'px;';
    };
    return NumberPickerOption;
}());
exports.NumberPickerOption = NumberPickerOption;
var NumberPickerErrorMessage = (function () {
    function NumberPickerErrorMessage(init) {
        this.invalidNumber = 'Invalid Number';
        this.invalidMin = 'Invalid min value';
        this.invalidMax = 'Invalid max value';
        this.invalidStep = 'Invalid step value';
        this.invalidEmpty = 'Value cannot be empty';
        Object.assign(this, init);
    }
    return NumberPickerErrorMessage;
}());
exports.NumberPickerErrorMessage = NumberPickerErrorMessage;
//# sourceMappingURL=number-picker.component.js.map