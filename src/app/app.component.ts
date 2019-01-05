import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { CheckBoxListValidators } from './checkbox-list/checkbox-list.component';
export interface ILookUp {
  id: number;
  description: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  // public selected:Array<ILookUp> = [{id:2,description:'Second'}];
  public selected: Array<number> = [2];
  public reactiveForm: FormGroup;
  data$: Observable<Array<ILookUp>> = Observable.of([{ id: 1, description: 'First' },
  { id: 2, description: 'Second' }, { id: 3, description: 'Third' }
    , { id: 4, description: 'Fourth' }, { id: 5, description: 'Fifth' }]);
  data2$:Observable<string[]>=Observable.of(['ABC','CDE','DEF','EFG']);
  selected2:Array<string>=[];
  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      checkboxList: [[], [CheckBoxListValidators.required,
      CheckBoxListValidators.minLength(1),
      CheckBoxListValidators.maxLength(3)]],
      booleanCheckboxList: [[false], [CheckBoxListValidators.required]],
      selected2:[this.selected2]
    });
  }
}
