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
  draggedIndex: number | null = null;
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

  onDragStart(event: DragEvent, index: number): void {
    this.draggedIndex = index;
    // event.dataTransfer?.setData('text/plain', index.toString());
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Permite que el elemento se pueda soltar aquí
  }

  onDrop(event: DragEvent, targetIndex: number): void {
    event.preventDefault();
    if (this.draggedIndex !== null) {
      const draggedItem = this.taskList.splice(this.draggedIndex, 1)[0];
      this.taskList.splice(targetIndex, 0, draggedItem);
      this.draggedIndex = null;
    }
  }

  addFinishedHour(index:number):void{
    const currentDate:Date = new Date();
    if (this.taskList[index]?.params) {
      this.taskList[index].params.finish_time = currentDate;
    }
  }
  removeFinishedHour(index:number):void{
    if (this.taskList[index]?.params) {
      this.taskList[index].params.finish_time = undefined;
    }
  }
}
