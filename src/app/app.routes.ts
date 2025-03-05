import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';

export const routes: Routes = [

    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: 'transaction-chart', loadComponent: () => import('./features/components/transaction-chart/transaction-chart.component').then(m => m.TransactionChartComponent) },

    { path: '', redirectTo: '/login', pathMatch: 'full' }, // הפנייה אוטומטית ל-login
    { path: 'login', loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent) },
    { path: 'transaction-chart', loadComponent: () => import('./features/components/transaction-chart/transaction-chart.component').then(m => m.TransactionChartComponent) },
    { path: 'not-found', loadComponent: () => import('./features/pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
    { path: '**', redirectTo: '/not-found' }, // הפנייה לדף Not Found אם אין נתיב מתאים

//     { path: '', loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent) },
//     { path: 'login', loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent) },
//     { path: '**', loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent) },

//     // { path: '', redirectTo: '/login', pathMatch: 'full' },
//     { path: 'transaction-chart', loadComponent: () => import('./features/components/transaction-chart/transaction-chart.component').then(m => m.TransactionChartComponent) },
//     { path: 'not-found', loadComponent: () => import('./features/pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
 ];
