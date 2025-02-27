import { Routes } from '@angular/router';
import { HomeComponent } from './pages/sidebar/home/home.component';
import { HistoryComponent } from './pages/sidebar/history/history.component';
import { AboutComponent } from './pages/sidebar/about/about.component';
import { PopularComponent } from './pages/sidebar/popular/popular.component';
import { CategoriesComponent } from './pages/sidebar/categories/categories.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TopicComponent } from './pages/topic/topic.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'popular', component: PopularComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: ':username', component: ProfileComponent },
    { path: 'topic/:topic', component: TopicComponent},
];
