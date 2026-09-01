import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/sidebar/home/home.component').then((m) => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/sidebar/about/about.component').then((m) => m.AboutComponent) },
  { path: 'history', loadComponent: () => import('./pages/sidebar/history/history.component').then((m) => m.HistoryComponent) },
  { path: 'popular', loadComponent: () => import('./pages/sidebar/popular/popular.component').then((m) => m.PopularComponent) },
  { path: 'categories', loadComponent: () => import('./pages/sidebar/categories/categories.component').then((m) => m.CategoriesComponent) },
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./pages/auth/login/login.component').then((m) => m.LoginComponent) },
  { path: 'register', canActivate: [guestGuard], loadComponent: () => import('./pages/auth/register/register.component').then((m) => m.RegisterComponent) },
  { path: 'forgot-password', canActivate: [guestGuard], loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent) },
  { path: 'topic/:slug', loadComponent: () => import('./pages/topic/topic.component').then((m) => m.TopicComponent) },
  { path: 'thread/:id', loadComponent: () => import('./pages/thread-page/thread-page.component').then((m) => m.ThreadPageComponent) },
  {
    path: 'profile/:username',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  { path: 'not-found', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) },
  { path: '**', redirectTo: 'not-found' },
];
