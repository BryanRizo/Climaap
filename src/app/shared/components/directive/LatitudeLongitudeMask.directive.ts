import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appLatitudeLongitudeMask]',
  standalone: true
})
export class LatitudeLongitudeMaskDirective {
  private regex: RegExp = new RegExp(/^-?\d*\.?\d*$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const input = (event.target as HTMLInputElement).value;
    if (event.key === '.' && input.includes('.')) {
      event.preventDefault();
    }
    if (event.key === '-' && input.length > 0) {
      event.preventDefault();
    }

    const validChar = new RegExp(/[\d.-]/);
    if (!validChar.test(event.key)) {
      event.preventDefault();
    }
  }
  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (!this.regex.test(value)) {
      inputElement.value = value.slice(0, -1);
    }
  }
}
