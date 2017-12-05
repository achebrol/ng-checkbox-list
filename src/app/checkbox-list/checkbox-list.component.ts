
import { Component, Input, forwardRef, ElementRef, Renderer, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
  FormControl, Validator, ValidatorFn, AbstractControl
} from '@angular/forms';
let counter = 0;
export class CheckBoxListValidators {
  static required(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c && (<Array<any>>c.value).length === 0) {
        return { 'required': true };
      }
      return null;
    };
  }
  static minLength(count: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const selectedOptions = <Array<any>>c.value;
      if (selectedOptions && selectedOptions.length < count && count > 0) {
        return { 'minlength': true };
      }
      return null;
    };
  }
  static maxLength(count: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const selectedOptions = <Array<any>>c.value;
      if (selectedOptions && selectedOptions.length > count && count > 0) {
        return { 'maxlength': true };
      }
      return null;
    };
  }
}
@Component({
  selector: 'ng-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxListComponent),
      multi: true,
    }
    // ,{
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => CheckboxListComponent),
    //   multi: true,
    // }
  ]
})
export class CheckboxListComponent implements
  ControlValueAccessor
  // , Validator
  , OnInit {
  @Input() source: Array<any>;
  @Input() valueField = 'id';
  @Input() labelField = 'description';
  @Input() required = false;
  @Input() returnValuesOnly = true; // value will be set to integer values of selected items
  @Input() minLength = 0;
  @Input() maxLength = 0;
  @Input() colClass = 'col-sm-4';
  @Input() tabindex: Number = 0;
  @Output() blur = new EventEmitter();
  public identifier = `checkbox-${counter++}`;
  private data: Array<any> = [];
  constructor(private el: ElementRef, private renderer: Renderer) {  }

  ngOnInit(): void {
    // to remove the blue border around the control on tab
    this.renderer.setElementAttribute(this.el.nativeElement, 'tabindex', null);
  }

  // this is the initial value set to the component
  // can be an array of objects or an array of integer values
  public writeValue(obj: Array<any>) {
    if (obj) {
      this.data = obj.map(o => {
        if (o[this.valueField]) {
          return o;
        }
        const dummy = {};
        dummy[this.valueField] = o;
        return dummy;
      });
    } else {
      this.data = [];
    }
  }
  public isChecked(item: any) {
    return this.data && this.data.find(d => d[this.valueField] === item[this.valueField]) != null;
  }
  // registers 'fn' that will be fired wheb changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // validates the form, returns null when valid else the validation object
  // UPDATE: use only custom validators
  // public validate(c: FormControl) {
  //   if (this.data.length === 0 && this.required) {
  //     return { required: { valid: false } };
  //   }
  //   if (this.data.length === 0 && this.minLength > 0) {
  //     return { minlength: { valid: false } };
  //   }
  //   if (this.data.length > this.maxLength && this.maxLength > 0) {
  //     return { maxlength: { valid: false } };
  //   }

  //   return null;

  // }

  // not used, used for touch input
  public registerOnTouched(fn: any) {
    this.propagateTouch = fn;
  }
  public onTouch() {
    this.propagateTouch();
    this.blur.emit();
  }
  // change events from the textarea
  public onChange(event) {

    // get value from text area
    const newValue: number = parseInt(event.target.value, 10);
    const checked = event.target.checked;
    const item: any = this.source.find(d => d[this.valueField] === newValue);
    const existing = this.data.find(d => d[this.valueField] === newValue);


    if (existing) {
      const idx = this.data.findIndex(d => d[this.valueField] === newValue);
      this.data.splice(idx, 1);
    } else {
      this.data.push(item);
    }
    // update the form.the control value will be an array of objects selected or an array of integers
    this.propagateChange(this.data.map(d => this.returnValuesOnly ? d[this.valueField] : d));
  }

  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => { };
  private propagateTouch = () => { };
}
