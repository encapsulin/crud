import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL_API = "https://csdbevdga8.execute-api.us-east-1.amazonaws.com/fnDomkuh"

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) { }

  items = [
    {"id":1,"title":"Вареники","descr":" з сиром солоні ","price":"1/100", "img":"img/2.jpeg"},
    {"id":2,"title":"Вареники","descr":" з сиром солодкі","price":"1/100", "img":"img/2.jpeg"},
    {"id":3,"title":"Вареники","descr":"(картопля)","price":"1/100", "img":"img/3.jpeg"},
    {"id":4,"title":"Вареники","descr":"(картопля, печінка)","price":"1/100", "img":"img/4.jpeg"},
    {"id":5,"title":"Пельмені","descr":"(свин)","price":"1/100", "img":"img/5.jpeg"},
    {"id":6,"title":"Пельмені","descr":" (кур)","price":"1/100", "img":"img/6.jpeg"},
    {"id":7,"title":"Холодець","descr":" (свин + кур)","price":"4/300", "img":"img/1.jpeg"}
  ]

  getItem(id: number): Item {
    // throw new Error('Method not implemented.');
    console.log(id);
     let item = this.items.find(item => item.id === id) ?? {
      id: 0,
      title: '',
      descr: '',
      price: '1/100',
      img: ''
     }

    return item;
  }

  getItems():Item[]{
    return this.items;
  }

  getItemsHttp(): Observable<Item[]>{
    return this.http.get<Item[]>(URL_API);
    //return this.items;
  }

  // postItem(item:Item){
  //   console.log("postItem",item)
  //   return this.http.post(URL_API,{...item})
  // }

  postItem(item: Item): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    console.log("postItem", item);
    return this.http.post(URL_API, { ...item }, { headers });
  }

  getItemById(id: number): any {
    return this.items.find(item => item.id === id);
  }



}
