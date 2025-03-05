import { Component, inject, OnInit } from '@angular/core';
import { CardTopicsComponent } from "../../../components/card-topics/card-topics.component";
import { CategoryApiService } from '../../../../api/category/category-api.service';
import { NgFor } from '@angular/common';
import { Category } from '../../../../api/category/interfaces/category-interfaces';

@Component({
  selector: 'app-categories',
  imports: [CardTopicsComponent, NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  categoryApiService = inject(CategoryApiService);
  categories: Category[] = [];
  page: number = 0

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.categoryApiService.getCategories(this.page).subscribe((response) => {
      this.categories = response;
    });
  }
}
