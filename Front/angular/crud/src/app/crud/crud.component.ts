import { Component } from '@angular/core';
import { ItemsComponent } from './items/items.component';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-crud',
  imports: [ ItemsComponent, HeaderComponent],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {


  constructor(){

  }
}
