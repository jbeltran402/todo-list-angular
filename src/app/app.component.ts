import { Component } from '@angular/core';
import {ToDoListComponent} from './to-do-list/to-do-list.component';

@Component({
  selector: 'app-root',
  imports: [ToDoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'To-Do_List';
}
