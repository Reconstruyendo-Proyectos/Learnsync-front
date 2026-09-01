import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CardTopicsComponent } from '../../../components/card-topics/card-topics.component';
import { CategoryApiService } from '../../../../api/category/category-api.service';
import { NgFor } from '@angular/common';
import { Category } from '../../../../api/category/interfaces/category-interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories',
  imports: [CardTopicsComponent, NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  categoryApiService = inject(CategoryApiService);
  categories: Category[] = [];
  page = 0;
  size = 10;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.categoryApiService
      .getCategories(this.page, this.size)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.categories = response;
      });
  }
}
