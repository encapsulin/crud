import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private URL_API = "https://csdbevdga8.execute-api.us-east-1.amazonaws.com/fnDomkuh"

  constructor(private http:HttpClient) { }

  items:Item[] = [
    {"skid":'1',"title":"Вареники","descr":" з сиром солоні ","price":"1/100", "img":"img/2.jpeg","role":"doc"},
    // {"skid":'2',"title":"Вареники","descr":" з сиром солодкі","price":"1/100", "img":"img/2.jpeg","role":"doc"},
    // {"skid":'3',"title":"Вареники","descr":"(картопля)","price":"1/100", "img":"img/3.jpeg","role":"doc"},
    // {"skid":'4',"title":"Вареники","descr":"(картопля, печінка)","price":"1/100", "img":"img/4.jpeg","role":"doc"},
    {"skid":'5',"title":"Пельмені","descr":"(свин)","price":"1/100", "img":"img/5.jpeg","role":"doc"},
    // {"skid":'6',"title":"Пельмені","descr":" (кур)","price":"1/100", "img":"img/6.jpeg","role":"doc"},
    {"skid":'7',"title":"Холодець","descr":" (свин + кур)","price":"4/300", "img":"img/1.jpeg","role":"doc"}
  ]

  // getItem(id: string): Item {
  //   // throw new Error('Method not implemented.');
  //   console.log(`getItem(${id})`);
  //    let item = this.items.find(item => item.skid === id) ?? {
  //     skid: '',
  //     title: '?',
  //     descr: '',
  //     price: '1/100',
  //     img: '',
  //     role:''
  //    }

  //   return item;
  // }


  postItem(item: Item): any {
    console.log("postItem", item);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.URL_API, { ...item }, { headers }).subscribe(data=>{
      console.log(data);
    });
  }

  // getItemById(id: string): any {
  //   return this.items.find(item => item.skid === id);
  // }


  // getItems1():Item[]{
  //   this.http.get(`${this.URL_API}?role=doc`)
  //   .pipe(map(data=>{
  //     console.log("map:", data)
      
  //   }))
  //   .subscribe(data=>{
  //     console.log("subscribe:",data);
  //   })
  //   return this.items;
  // }

  getItemsObs(): Observable<Item[]> {
    return this.http.get<any>(`${this.URL_API}?role=doc`).pipe(
      map((response) => {
        if (response.statusCode === 200 && response.data && response.data.Items) {
          return response.data.Items.map((item: any) => ({
            img: item.img || '',
            role: item.role || '',
            descr: item.descr || '',
            pkid: item.pkid || '',
            skid: item.skid || '',
            titleLower: item.titleLower || '',
            parent: item.parent || '',
            price: item.price || '',
            title: item.title || '',
          }));
        }
        console.error('Unexpected response structure:', response);
        return [];
      })
    );
  }
  
  getItems():Item[]{
    return this.items.slice()
  }
  // getItems():Item[]{
  //   this.getItemsObs().subscribe(
  //     (items) => {
  //       console.log('Parsed Items:', items);
  //       this.items = items; // Use the parsed Items
  //     },
  //     (error) => {
  //       console.error('Error fetching items:', error);
  //     }
  //   );
  //   return this.items ;
  // }

  itemDelete(skid: string): any {
    console.log(`itemDelete(${skid})`);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.delete(`${this.URL_API}?skid=${skid}`, { headers }).subscribe(data=>{
      console.log(data);
    });
  }
}
