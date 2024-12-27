import { ItemService } from './../item/item.service';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder){
    this.itemForm = this.fb.group({
      title: [''],
      descr: ['']
    })
  }

  handleSubmit(){
    console.log("handleSubmit");
    const item = {...this.itemForm.value}
    this.itemService.putItem(item);
    this.closePanel.emit('SUBMIT')
  }

  handleCancel(){
    this.closePanel.emit('SUBMIT')
  }
}
