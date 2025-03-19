import { Component } from '@angular/core';
import { TaskList } from './interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})

export class ToDoListComponent {
  newTaskDescription: string = '';
  taskList: TaskList[] = [
    {
      params: {
        taskDescription: 'This is where you see your tasks.',
        status: false,
        start_time: new Date(),
        finish_time: undefined
      },
    },
  ];

  addTask(): void {
    if (this.newTaskDescription.trim() === '') {
      return;
    }
    const newTask: TaskList = {
      params: {
        taskDescription: this.newTaskDescription,
        status: false,
        start_time: new Date(),
        finish_time: undefined,
      },
    };
    this.taskList.push(newTask);
  }

  delteTask(id:number): void{
    this.taskList.splice(id, 1);
  }
}
