import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { Item } from './item/item.model';
import { ItemService } from './item/item.service';
import { ItemFormComponent } from './item-form/item-form.component';

@Component({
  selector: 'app-items',
  imports: [CommonModule, ItemComponent,ItemFormComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})

export class ItemsComponent {
  items: Item[] = [];
  showModal = false;
  
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems(); // Fetch items on component initialization
  }
}

