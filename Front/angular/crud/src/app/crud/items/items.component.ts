import {  CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { Item } from '../item/item.model';
import { ItemService } from '../item/item.service';
import { ItemFormComponent } from '../item-form/item-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items',
  imports: [CommonModule, ItemComponent,ItemFormComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})

export class ItemsComponent {
  items: Item[] = [];
  showModal:boolean = false;
  item:Item = {
    skid: '',
    title: '',
    descr: '',
    price: '',
    img: '',
    role:''
  }
  
  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    //this.items = this.itemService.getItems(); 
    this.itemService.getItemsObs().subscribe(
      (items) => {
        console.log('Parsed Items:', items);
        this.items = items; // Use the parsed Items
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  itemGet(id:string){
    this.item = this.itemService.getItem(id);
    console.log(this.item)
  }

    // Function to show modal
    openModal(id:string) {
      this.showModal = true;
      console.log(id)
      this.itemGet(id);
    }
  
    // Function to close modal
    closeModal() {
      this.showModal = false;
    }

 
}

