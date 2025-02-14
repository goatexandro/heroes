import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchHeroComponent } from './hero-search/hero-search.component';

export const routes: Routes = [
    {
        path: "heroes",
        component: HeroesComponent
    },
    {
        path: "hero/:id",  // Ruta para detalles del héroe
        component: HeroDetailComponent
    },
    {
        path: "dashboard/:page",  
        component: DashboardComponent
    },
    {
        path: "**",
        redirectTo: "dashboard/1"  
    },
    

];
