import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './project/project.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"about",component:AboutComponent},
    {path:"project",component:ProjectsComponent},
    {path:"contact",component:ContactComponent},
    {path:"**",component:PageNotFoundComponent},
];
