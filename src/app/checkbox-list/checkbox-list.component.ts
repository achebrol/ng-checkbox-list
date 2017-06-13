
import { Component, Input, forwardRef, ElementRef, Renderer, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, ValidatorFn, AbstractControl } from '@angular/forms';
export class CheckBoxListValidators {
  static required(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
       const selectedOptions = <Array<any>>c.value;
      if (selectedOptions.length === 0) {
        return { 'required': true };
      }
      return null;
    };
  }
  static minLength(count: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const selectedOptions = <Array<any>>c.value;
      if (selectedOptions.length < count && count > 0) {
        return { 'minlength': true };
      }
      return null;
    };
  }
  static maxLength(count: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const selectedOptions = <Array<any>>c.value;
      if (selectedOptions.length > count && count > 0) {
        return { 'maxlength': true };
      }
      return null;
    };
  }
}
let counter=0;
@Component({
    selector: 'ng-checkbox-list',
    templateUrl: './checkbox-list.component.html',
    styleUrls: ['./checkbox-list.component.css'],
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxListComponent),
      multi: true,
    }]        
})
export class CheckboxListComponent implements ControlValueAccessor, OnInit {
    @Input()source:Array<any>;
    @Input() valueField:string;
    @Input() labelField:string;
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
