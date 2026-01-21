import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {ClockComponent} from './clock/clock.component';
import {PomodoroTimerComponent} from './pomodoro-timer/pomodoro-timer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ToDoListComponent,ClockComponent,PomodoroTimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'To-Do_List';
}
