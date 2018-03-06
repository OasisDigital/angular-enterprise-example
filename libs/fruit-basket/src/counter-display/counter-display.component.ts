import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'counter-display',
  templateUrl: './counter-display.component.html'
})
export class CounterDisplayComponent {
  @Input() label: string;
  @Input() counter: number;
  @Output() pick = new EventEmitter<number>();
}
