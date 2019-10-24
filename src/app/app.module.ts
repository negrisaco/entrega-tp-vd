import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http'; // saque el httpmodule x si quiero volver a atras
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { MateriaComponent } from './materia/materia.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';

// Servicios
import { ConfigurationService } from '../services/configuration.service';
import { AlumnoService } from './alumno/alumno.service';
import { ProfesorService } from './profesor/profesor.service';
import { MateriaService } from './materia/materia.service';
import { ConsignasComponent } from './consignas/consignas.component';


@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    ProfesorComponent,
    MateriaComponent,
    HomepageComponent,
    HeaderComponent,
    ConsignasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigurationService,
    AlumnoService,
    ProfesorService,
    MateriaService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
