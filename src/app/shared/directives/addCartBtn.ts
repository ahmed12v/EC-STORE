import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDebounceClick]',
  standalone: true
})
export class DebounceClickDirective {
  @Input() debounceTime = 500;
  @Output() debounceClick = new EventEmitter();
  private timeout!: ReturnType<typeof setTimeout>;

  @HostListener('click', ['$event'])
  clickEvent(event: Event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.debounceClick.emit(event), this.debounceTime);
  }
}
