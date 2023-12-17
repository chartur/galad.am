import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-gift-box',
  templateUrl: './gift-box.component.html',
  styleUrl: './gift-box.component.scss'
})
export class GiftBoxComponent {
  public opened = false;
  @Output() open: EventEmitter<void> = new EventEmitter<void>();

  public openBox():void {
    this.opened = true;
    this.open.emit();
  }
}
