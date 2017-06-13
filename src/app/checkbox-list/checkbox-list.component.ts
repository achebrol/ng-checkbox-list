
import { Component, Input, forwardRef, ElementRef, Renderer, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
let counter=0;
export class CheckBoxListValidators {
static required(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if ((<Array<any>>c.value).length === 0) {
        return { 'required': true };
      }
      return null;
    };
  }
static minLength(count: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
const selectedOptions = <Array<any>>c.value;
      if (selectedOptions.length == count && count > 0) {
        return { 'minlength': true };
      }
      return null;
    };
  }
static maxLength(count: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const selectedOptions = (<Array<any>>c.value;
      if (selectedOptions.length > count && count > 0) {
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
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxListComponent),
      multi: true,
    }]
})
export class CheckboxListComponent implements ControlValueAccessor, Validator, OnInit {
    @Input()source:Array<any>;
    @Input() valueField:string;
    @Input() labelField:string;
    @Input() required:false;
    @Input() minLength=0;
    @Input() maxLength=0;
    @Input() colClass='col-sm-4';
    @Input('tabindex') _tabindex=0;
    public identifier = `checkbox-${counter++}`;

    constructor(private el:ElementRef,private renderer: Renderer){

    }

    ngOnInit():void{
      //to remove the blue border around the control on tab
      this.renderer.setElementAttribute(this.el.nativeElement,"tabindex",null);
    }

    private data: Array<any>;

    // this is the initial value set to the component
    public writeValue(obj: any) {
        if (obj) {
            this.data = obj;
        }
    }
    public isChecked(item:any){
      return this.data.find(d=>d[this.valueField]==item[this.valueField])!=null;
    }
    // registers 'fn' that will be fired wheb changes are made
    // this is how we emit the changes back to the form
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    // validates the form, returns null when valid else the validation object
    public validate(c: FormControl) {
      if(this.data.length==0 && this.required){
        return {required:{valid:false}};
      }
      if(this.data.length==0 && this.minLength>0){
        return {minlength:{valid:false}};
      }
      if(this.data.length>this.maxLength && this.maxLength>0){
        return {maxlength:{valid:false}};
      }

      return null;

    }

    // not used, used for touch input
    public registerOnTouched(fn: any) {
      this.propagateTouch = fn;
    }
    private onTouch(){
      this.propagateTouch();
    }
    // change events from the textarea
    private onChange(event) {

        // get value from text area
        let newValue:any = event.target.value;
        let checked = event.target.checked;
        let item:any = this.source.find(d=>d[this.valueField]==newValue);
        let existing = this.data.find(d=>d[this.valueField]==newValue);


        if(existing){
          let idx = this.data.findIndex(d=>d[this.valueField]==newValue);
          this.data.splice(idx,1);
        }
        else{
          this.data.push(item);
        }
        // update the form
        this.propagateChange(this.data);
    }

    // the method set in registerOnChange to emit changes back to the form
    private propagateChange = (_: any) => { };
    private propagateTouch = () => {};
}
