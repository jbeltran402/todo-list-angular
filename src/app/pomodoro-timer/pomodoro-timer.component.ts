import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.css'
})
export class PomodoroTimerComponent {

  default_seconds: number = 60
  seconds = signal(this.default_seconds);
  private timerId: any;

  countdown_timer(action: string) {

    switch (action) {
      case ("increase_time"):
        this.default_seconds += 10;
        this.seconds.update(s => s + 10);
        break;
      case ("reduce_time"):
        this.default_seconds -= 10;
        this.seconds.update(s => s - 10);
        break;
      case ("start"):
        clearInterval(this.timerId);
        this.timerId = setInterval(() => {
          if (this.seconds() > 0) {
            this.seconds.update(s => s - 1);
          } else {
            clearInterval(this.timerId);
          }
        }, 1000); // 1000ms = 1 segundo
        break;
      case ("restar"):
        this.seconds.set(this.default_seconds);
        break;
      case ("stop"):
        clearInterval(this.timerId);
    }
  }
}
