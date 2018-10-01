# Strongmind Angular Component Suite #

Strongmind styled, html controls, and components (Angular v2.0.0+)

## Requirements ##
* [Angular](https://angular.io) (2.0.0+)

## UI Dependency ##
* None (Twitter Bootstrap v3+ - Recommended)

## Installation ##

```
npm install sm-angular-component-suite -save
```

## Basic usage ##
Import desired [components] in your `app.module` and add it to the declarations array.
Alternatively, you can import desired [components] to a shared module, to make it available across all modules in your Angular application.

## Example usage (NumberPickerComponent) ##
```typescript
...
import { NumberPickerComponent } from 'sm-angular-component-suite/components';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberPickerComponent
  ],
  imports: [
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Add the `strongmind-number-picker` directive to the page where you want to use the number picker.

Quickest way to use numberpicker
```html
<strongmind-number-picker [(pickerValue)]="pickerValue"></strongmind-number-picker>
```
Or, to update just some option values
```html
<strongmind-number-picker [numberPickerOption]="{ min: 0, max: 20 }" [(pickerValue)]="pickerValue"></strongmind-number-picker>
```
Or to modify all/any numberpicker options
```html
<strongmind-number-picker [numberPickerOption]="numberPickerOptions" [(pickerValue)]="pickerValue"></strongmind-number-picker>
```

### Directive Inputs and Outputs ###

| Attribute        | Type             | Required  | Default   | Description       |
| :------------- |:-------------| :-----: | :-----: | :----------- |
| pickerValue	| (Input) Number | Yes | | The value of the number picker from parent component. |
| numberPickerOptions	| (Input) [NumberPickerOption] | No | object | The strongly typed object to define options for picker. |
| min | Number | No | 0 | The minimal number limit on the number picker. |
| max | Number | No | 100 | The maximum number limit on the number picker. |
| step | Number | No | 1 | The step value for the number picker. |
| acceptNull | Boolean | No | false |	Defines if the picker should allow the user to leave the input empty, if false, a number will be expected. |
| showValidation | Boolean | No | true | Defines if the picker should show validation errors, if false, the input will reset to a previous value on invalid state instead of showing the error. |
| showAllErrors |	Boolean |	No | false | Defines if all errors will be shown on invalid picker state, if false, only the first error will be shown (business value - limited client area). |
| pickerCss | String | No | 'input-group' |	Defines the picker css. Overrideable to add custom styles. The picker follows 'Twitter Bootstrap' standards. |
| buttonCss	| String | No |	'btn btn-secondary' |	Defines the picker button css. Overrideable to add custom styles. The picker buttons follow 'Twitter Bootstrap' standards. |
| buttonIconDecrease | String |	No |  | Defines a picker button icon for decrease. If set, will render icon in decrease button. |
| buttonIconIncrease | String |	No |  | Defines a picker button icon for increase. If set, will render icon in increase button. |
| inputDisabled	| Boolean | No | false | Defines if the picker should be disabled for the user if true. |
| inputWidth | Number |	No |  | Defines a picker inputs specific width. |
| errorMessages | NumberPickerErrorMessage |  |   | Defines error messages for invalid states. |
| invalidNumber | String | No | | 'Invalid Number' |
| invalidMin | String | No | | 'Invalid min value' |
| invalidMax | String | No | | 'Invalid max value' |
| invalidStep | String | No | |'Invalid step value' |
| invalidEmpty | String | No | | 'Value cannot be empty' |

[npm-url]: https://npmjs.org/package/sm-angular-component-suite
[github-url]: https://github.com/StrongMind/angularcomponentsdemo

