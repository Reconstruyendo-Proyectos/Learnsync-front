import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-card-profile',
  imports: [NgIf],
  templateUrl: './template-card-profile.component.html',
  styleUrl: './template-card-profile.component.css'
})
export class TemplateCardProfileComponent implements OnInit {
  @Input() src: string = "";
  @Input() alt: string = "";
  @Input() title: string = "";
  @Input() status: string = "";
  @Input() radius: string = "";
  @Input() width: string = "80px";
  @Input() height: string = "";
  isPrize: boolean = true;

  color = "";

  ngOnInit() {
    switch (this.status) {
      case 'Canjeado':
        this.color = "#B9B9B9";
        this.isPrize = true;
        break;

      case 'Por Canjear':
        this.color = "#2dd128";
        this.isPrize = true;
        break;

      default:
        this.isPrize = false;
        break;
    }
  }
}
