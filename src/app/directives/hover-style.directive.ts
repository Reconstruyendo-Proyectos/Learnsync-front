import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[appHoverStyle]'
})
export class HoverStyleDirective {
  
  @Input() hoverBackgroundColor?: string;

  private originalStyles: Partial<CSSStyleDeclaration> = {};

  private el = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter() {
    this.originalStyles = {
      backgroundColor: this.el.nativeElement.style.backgroundColor
    };

    if (this.hoverBackgroundColor) this.el.nativeElement.style.backgroundColor = this.hoverBackgroundColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.originalStyles.backgroundColor) this.el.nativeElement.style.backgroundColor = this.originalStyles.backgroundColor;
  }

}
