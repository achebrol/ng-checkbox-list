import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from "rxjs/Rx";
export interface ILookUp
{
  id:number;
  description:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public selected:Array<ILookUp> = [{id:2,description:'Second'}];
  public reactiveForm: FormGroup;
  data$:Observable<Array<ILookUp>> =Observable.of([{id:1,description:'First'},
  {id:2,description:'Second'},{id:3,description:'Third'}
  ,{id:4,description:'Fourth'},{id:5,description:'Fifth'}]);
  constructor(private fb: FormBuilder){
    
    
    this.reactiveForm = this.fb.group({
      selected: [this.selected]
    })
  }
}
