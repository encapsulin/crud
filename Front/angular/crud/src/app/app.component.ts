import { Component } from '@angular/core';
import { CrudComponent } from './crud/crud.component';


@Component({
  selector: 'app-root',
  imports: [ CrudComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud';
}
