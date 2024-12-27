import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { Item } from './item/item.model';
import { ItemService } from './item/item.service';

@Component({
  selector: 'app-items',
  imports: [CommonModule, ItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})

export class ItemsComponent {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems(); // Fetch items on component initialization
  }
}

