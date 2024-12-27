import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { Item } from '../item/item.model';
import { ItemService } from '../item/item.service';
import { ItemFormComponent } from '../item-form/item-form.component';

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
    id: 0,
    title: '',
    descr: '',
    price: '',
    img: ''
  }
  
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems(); // Fetch items on component initialization
  }

  itemGet(id:number){
    this.item = this.itemService.getItem(id);
  }

    // Function to show modal
    openModal(id:number) {
      this.showModal = true;
      console.log(id)
    }
  
    // Function to close modal
    closeModal() {
      this.showModal = false;
    }
}

