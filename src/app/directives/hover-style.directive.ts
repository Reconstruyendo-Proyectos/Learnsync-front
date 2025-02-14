import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverStyle]'
})
export class HoverStyleDirective {
  
  @Input() hoverBackgroundColor?: string;

  private originalStyles: Partial<CSSStyleDeclaration> = {};

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    // Guardar los estilos originales antes de aplicar los nuevos
    this.originalStyles = {
      backgroundColor: this.el.nativeElement.style.backgroundColor
    };

    // Aplicar los nuevos estilos durante el hover
    if (this.hoverBackgroundColor) this.el.nativeElement.style.backgroundColor = this.hoverBackgroundColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    // Restaurar los estilos originales
    if (this.originalStyles.backgroundColor) this.el.nativeElement.style.backgroundColor = this.originalStyles.backgroundColor;
  }

}
