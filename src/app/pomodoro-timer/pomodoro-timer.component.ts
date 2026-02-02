import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TimerSettings } from './interface';

@Component({
  selector: 'app-pomodoro-timer',
  imports: [DatePipe],
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.css'
})
export class PomodoroTimerComponent {

  timer: TimerSettings = {
    'focus': 1500,
    'short': 300,
    'long': 900
  };
  timer_mode = signal<keyof TimerSettings>('focus');
  seconds = signal(this.timer['focus']);

  private timerId: any;
  status: boolean = true;
  focus_counter: number = 1;

  private stop_and_clean_interval() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.seconds.set(this.timer[this.timer_mode()]);
    }
    this.status = true;
  }

  changeMode(mode: keyof TimerSettings) {
    this.timer_mode.set(mode);          // Guardamos el nuevo modo en el cofre
    this.seconds.set(this.timer[mode]); // Reiniciamos los segundos
    this.stop_and_clean_interval();     // Limpiamos el intervalo actual
  }

  countdown_timer(action: string) {

    switch (action) {
      case ("increase_time"):
        // 86340s = 23h:59m:00s
        this.timer[this.timer_mode()] = Math.min(this.timer[this.timer_mode()] + 60, 86340);
        this.seconds.update(s => Math.min(s + 60, 86340));
        break;
      case ("reduce_time"):
        this.timer[this.timer_mode()] = Math.max(0, this.timer[this.timer_mode()] - 60);
        this.seconds.update(s => Math.max(0, s - 60));
        if (this.seconds() === 0) {
          this.stop_and_clean_interval();
        }
        break;
      case ("start"):
        this.startTimer();
        break;
      case ("restar"):
        this.stop_and_clean_interval();
        break;
      case ("stop"):
        clearInterval(this.timerId);
        this.status = true;
    }
  }

  private startTimer() {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      if (this.seconds() > 0) {
        this.seconds.update(s => s - 1);
        this.status = false;
      } else {
        switch (this.timer_mode()) {
          case ("focus"):
            if (this.focus_counter === 4) {
              this.changeMode('long');
            } else {
              this.changeMode('short');
            }
            this.focus_counter++;
            break;
          case ("short"):
            this.changeMode('focus');
            break;
          case ("long"):
            this.focus_counter = 1;
            this.changeMode('focus');
            break;
        }
      }
    }, 1000); // 1000ms = 1 segundo
  }

  ngOnDestroy() {
    this.stop_and_clean_interval()
  }
}
