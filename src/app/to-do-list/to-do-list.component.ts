import { Component } from '@angular/core';
import { params } from './interface';

@Component({
  selector: 'app-to-do-list',
  imports: [],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {
  list: params[] = [
    {
      todo: 'Helo World',
      status: true,
      start_time: new Date("2025-03-12T08:00:00Z"),
      finish_time: undefined,
    },
    {
      todo: 'Second',
      status: true,
      start_time: new Date("2025-03-12T08:00:00Z"),
      finish_time: undefined,
    }
  ]
}
