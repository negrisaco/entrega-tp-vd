import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { MateriaComponent } from './materia/materia.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { ConsignasComponent} from './consignas/consignas.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'Alumnos', component: AlumnoComponent },
  { path: 'Materias', component: MateriaComponent },
  { path: 'Profesores', component: ProfesorComponent },
  { path: 'Consignas', component: ConsignasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
