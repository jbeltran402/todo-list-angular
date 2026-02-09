import { Component, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit, OnDestroy {
  format = signal(false);
  clock = signal<Date | null>(null);
  private timerId: any;
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Captura la hora del cliente (No del servidor)
      this.clock.set(new Date());
      this.timerId = setInterval(() => {
        this.clock.set(new Date());
      }, 1000);
    }
  }

  toggleFormat() {
    this.format.update(currentValue => !currentValue);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
