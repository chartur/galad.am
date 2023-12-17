import {Component, OnDestroy, OnInit} from '@angular/core';
import "assets/js/confetti.js";

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrl: './gift.component.scss'
})
export class GiftComponent implements OnInit, OnDestroy {
  private interval: any;

  ngOnInit() {
  }

  ngOnDestroy() {
    this.abort()
  }

  public openBox(): void {
    this.randomFair();
  }

  private randomFair() {
    let interval: any;
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 3
    };
    const confetties = [];
    const randomInRange = (min: number, max: number): number => {
      return Math.random() * (max - min) + min;
    }

    this.interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        },
      });
    }, 250);
  }

  private abort() {
    clearInterval(this.interval);
  }
}
