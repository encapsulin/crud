import { ItemService } from './../item/item.service';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../item/item.model';

@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent {

  private itemService = inject(ItemService);
  itemForm: FormGroup;
  @Output() closePanel= new EventEmitter<'SUBMIT'>()
  @Input() item!: Item;

  constructor(private fb: FormBuilder){
    this.itemForm = this.fb.group({
      title: [''],
      descr: [''] ,
      img: [''],
      price: ['']
    })
  }

  handleSubmit(){
    console.log("handleSubmit");
    const item = {...this.itemForm.value}
    
    //this.itemService.postItem(item);
    this.itemService.postItem(item).subscribe({
      next: (response) => console.log('Item added:', response),
      error: (err) => console.error('Error adding item:', err)
    });
    
    this.closePanel.emit('SUBMIT')
  }

  handleCancel(){
    this.closePanel.emit('SUBMIT')
  }
}
