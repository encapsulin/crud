import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule


@Component({
  selector: 'app-crud',
  imports: [CommonModule],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css','style.btn.css','style.container.css']
})
export class CrudComponent {
  items = [
    {"id":1,"title":"asdf","descr":"descr1","price":4},
    {"id":2,"title":"asdf2","descr":"descr1","price":6},
    {"id":3,"title":"asdf3","descr":"descr1","price":5}
  ]

  constructor(){

  }
}
