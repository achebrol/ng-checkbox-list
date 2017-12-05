
import { Component, Input, forwardRef, ElementRef, Renderer, OnInit } from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
  FormControl, Validator, ValidatorFn, AbstractControl, FormGroup
} from '@angular/forms';
@Component({
  selector: 'ng-boolean-checkbox-list',
  templateUrl: './boolean-checkbox-list.component.html',
  styleUrls: ['./boolean-checkbox-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BooleanCheckboxListComponent),
      multi: true,
    }
    // ,{
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => BooleanCheckboxListComponent),
    //   multi: true,
    // }
  ]
})
export class BooleanCheckboxListComponent implements
  ControlValueAccessor
  // , Validator
  , OnInit {
  source: Array<any>;
  @Input() tabindex: Number = 0;
  private data: Array<number> = [];
  formGroup: FormGroup;
  constructor(private el: ElementRef, private renderer: Renderer) {
    this.source = [{ id: 1, description: 'Yes' }, { id: 0, description: 'No' }];
    this.formGroup = new FormGroup({
      _control: new FormControl()
    });

    this.formGroup.get('_control').valueChanges.subscribe(v => {
      this.propagateChange(v.map(d => !!d));
      if (this.formGroup.get('_control').touched) {
        this.propagateTouch();
      }
    });

  }

  ngOnInit(): void {
    // to remove the blue border around the control on tab
    this.renderer.setElementAttribute(this.el.nativeElement, 'tabindex', null);
  }

  // this is the initial value set to the component
  // can be an array of objects or an array of integer values
  public writeValue(obj: Array<boolean>) {
    this.data = [];
    if (obj) {
      this.formGroup.get('_control').patchValue(obj.map(d => d ? 1 : 0));
    } else {
      this.formGroup.get('_control').reset([]);
    }
  }
  // registers 'fn' that will be fired wheb changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // not used, used for touch input
  public registerOnTouched(fn: any) {
    this.propagateTouch = fn;
  }
  public onTouch() {
    this.propagateTouch();
  }
  // change events from the textarea
  private onChange(event) {

    // update the form.the control value will be an array of objects selected or an array of integers
    this.propagateChange(this.data.map(d => !!d));
  }

  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => { };
  private propagateTouch = () => { };
}
