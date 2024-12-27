import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-items',
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  items = [
    {"id":1,"title":"asdf","descr":"descr1","price":4},
    {"id":2,"title":"asdf2","descr":"descr1","price":6},
    {"id":3,"title":"asdf3","descr":"descr1","price":5}
  ]
}
