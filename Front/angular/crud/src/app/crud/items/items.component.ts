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
    {"id":1,"title":"Вареники","descr":" з сиром солоні ","price":"1/100", "img":"img/2.jpeg"},
    {"id":2,"title":"Вареники","descr":" з сиром солодкі","price":"1/100", "img":"img/2.jpeg"},
    {"id":3,"title":"Вареники","descr":"(картопля)","price":"1/100", "img":"img/3.jpeg"},
    {"id":1,"title":"Вареники","descr":"(картопля, печінка)","price":"1/100", "img":"img/4.jpeg"},
    {"id":2,"title":"Пельмені","descr":"(свин)","price":"1/100", "img":"img/5.jpeg"},
    {"id":2,"title":"Пельмені","descr":" (кур)","price":"1/100", "img":"img/6.jpeg"},
    {"id":2,"title":"Холодець","descr":" (свин + кур)","price":"4/300", "img":"img/1.jpeg"}
  ]
}
