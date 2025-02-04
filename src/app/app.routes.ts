import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { AboutComponent } from './pages/about/about.component';
import { PopularComponent } from './pages/popular/popular.component';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'popular', component: PopularComponent },
    { path: 'categories', component: CategoriesComponent },
];
