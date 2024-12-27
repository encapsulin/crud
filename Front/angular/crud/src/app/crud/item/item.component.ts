import { Item } from './item.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  
  @Input() item!: Item;

  @Output() openModal = new EventEmitter<void>(); // Emit event to parent

  // Trigger modal opening in parent
  triggerOpenModal(): void {
    this.openModal.emit(); // Notify parent component
  }
}
