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
    {"id":1,"title":"Вареники","descr":" з сиром солоні ","price":4, "img":"img/2.jpeg"},
    {"id":2,"title":"Вареники","descr":" з сиром солодкі","price":6, "img":"img/2.jpeg"},
    {"id":3,"title":"Вареники ","descr":"(картопля)","price":5, "img":"img/3.jpeg"},
    {"id":1,"title":"Вареники ","descr":"(картопля, печінка)","price":4, "img":"img/4.jpeg"},
    {"id":2,"title":"Пельмені ","descr":"(свин)","price":6, "img":"img/5.jpeg"},
    {"id":2,"title":"Пельмені","descr":" (кур)","price":6, "img":"img/6.jpeg"}
  ]
}
