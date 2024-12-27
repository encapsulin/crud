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
    {"id":4,"title":"Вареники","descr":"(картопля, печінка)","price":"1/100", "img":"img/4.jpeg"},
    {"id":5,"title":"Пельмені","descr":"(свин)","price":"1/100", "img":"img/5.jpeg"},
    {"id":6,"title":"Пельмені","descr":" (кур)","price":"1/100", "img":"img/6.jpeg"},
    {"id":7,"title":"Холодець","descr":" (свин + кур)","price":"4/300", "img":"img/1.jpeg"}
  ]

  getItems(): Item[]{
    return this.items;
  }

  putItem(item_:Item){
    console.log("putItem",item_)
  }

  getItem(id: number): Item {
    // throw new Error('Method not implemented.');
    console.log(id);
    let item:Item = {
      id: 0,
      title: 't',
      descr: 'd',
      price: '',
      img: ''
    }
    return item;
  }

}
