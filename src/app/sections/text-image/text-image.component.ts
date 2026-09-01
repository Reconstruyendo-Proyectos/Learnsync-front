import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-image',
  imports: [],
  templateUrl: './text-image.component.html',
  styleUrl: './text-image.component.css'
})
export class TextImageComponent {
  @Input() h1: string = '';
  @Input() pList1: string[] = [];
  @Input() list: string[] = [];
  @Input() pList2: string[] = [];
  @Input() srcImage: string = '';
  @Input() altText: string = '';
}
