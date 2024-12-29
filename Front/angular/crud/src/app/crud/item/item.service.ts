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
    {"skid":'1',"title":"Вареники","descr":" з сиром солоні ","price":"1/100", "img":"img/2.jpeg"},
    {"skid":'2',"title":"Вареники","descr":" з сиром солодкі","price":"1/100", "img":"img/2.jpeg"},
    {"skid":'3',"title":"Вареники","descr":"(картопля)","price":"1/100", "img":"img/3.jpeg"},
    {"skid":'4',"title":"Вареники","descr":"(картопля, печінка)","price":"1/100", "img":"img/4.jpeg"},
    {"skid":'5',"title":"Пельмені","descr":"(свин)","price":"1/100", "img":"img/5.jpeg"},
    {"skid":'6',"title":"Пельмені","descr":" (кур)","price":"1/100", "img":"img/6.jpeg"},
    {"skid":'7',"title":"Холодець","descr":" (свин + кур)","price":"4/300", "img":"img/1.jpeg"}
  ]

  getItem(id: string): Item {
    // throw new Error('Method not implemented.');
    console.log(id);
     let item = this.items.find(item => item.skid === id) ?? {
      skid: '',
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
    console.log("postItem", item);
    // let 
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(URL_API, { ...item }, { headers });
  }

  getItemById(id: string): any {
    return this.items.find(item => item.skid === id);
  }



}
