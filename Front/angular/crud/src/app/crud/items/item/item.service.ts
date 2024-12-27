import { Injectable } from '@angular/core';
import { Item } from './item.model';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  items = [
    {"id":1,"title":"Вареники","descr":" з сиром солоні ","price":"1/100", "img":"img/2.jpeg"},
    {"id":2,"title":"Вареники","descr":" з сиром солодкі","price":"1/100", "img":"img/2.jpeg"},
    {"id":3,"title":"Вареники","descr":"(картопля)","price":"1/100", "img":"img/3.jpeg"},
    {"id":1,"title":"Вареники","descr":"(картопля, печінка)","price":"1/100", "img":"img/4.jpeg"},
    {"id":2,"title":"Пельмені","descr":"(свин)","price":"1/100", "img":"img/5.jpeg"},
    {"id":2,"title":"Пельмені","descr":" (кур)","price":"1/100", "img":"img/6.jpeg"},
    {"id":2,"title":"Холодець","descr":" (свин + кур)","price":"4/300", "img":"img/1.jpeg"}
  ]

  getItems(): Item[]{
    return this.items;
  }
}
