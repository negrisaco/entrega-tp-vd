import { Component, OnInit } from '@angular/core';
import { ProfesorService } from './profesor.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss']
})
export class ProfesorComponent implements OnInit {

  profesorForm: FormGroup;
  accentedCharacters =
  "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ' .";

  constructor(private profesorService: ProfesorService) {
    this.profesorForm = new FormGroup({
      dni: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      nombre: new FormControl('', [Validators.required, Validators.max(25), Validators.pattern("^[a-zA-Z" + this.accentedCharacters + "]+$")]),
      apellido: new FormControl('', [Validators.required, Validators.max(50), Validators.pattern("^[a-zA-Z" + this.accentedCharacters + "]+$")]),
      ciudad: new FormControl('', [Validators.required, Validators.max(25), Validators.pattern("^[a-zA-Z" + this.accentedCharacters + "]+$")]),
      direccion: new FormControl('', [Validators.required, Validators.max(50), Validators.pattern("^[a-zA-Z" + this.accentedCharacters + "0-9]+$")]),
      telefono: new FormControl('', [Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      fecha_nacimiento: new FormControl('', [Validators.required]),
  });
  }

  profesoresList = [];
  editar:boolean = false;
  legajo_profesor:string;

  ngOnInit() {
    this.profesorService.getAllProfesores().then(res => {
      this.profesoresList = res;
      console.log('LIST ', this.profesoresList);
    }).catch(e => {
      console.log('Error ', e);
    });
  }

  esEditar(profesor) {
    this.editar = true;
    this.legajo_profesor = profesor.legajo_profesor;
    let profesorObj = {};
    let formatoFecha = profesor.fecha_nacimiento.split('T')[0].split('-');
    console.log('SPLIT ', formatoFecha);
    profesorObj['fecha_nacimiento'] = {year: parseInt(formatoFecha[0]), month: parseInt(formatoFecha[1]), day: parseInt(formatoFecha[2])};
    profesorObj['dni'] = profesor.dni;
    profesorObj['nombre'] = profesor.nombre;
    profesorObj['apellido'] = profesor.apellido;
    profesorObj['ciudad'] = profesor.ciudad;
    profesorObj['direccion'] = profesor.direccion;
    profesorObj['telefono'] = profesor.telefono;
    console.log('EDITAR? ', profesorObj);
    this.profesorForm.setValue(profesorObj);
  }

  async borrarProfesor(legajoProfesor) {
    try {
        await this.profesorService.deleteProfesor(legajoProfesor);
        this.profesoresList = await this.profesorService.getAllProfesores();
    } catch (e) {
        console.log('Error delete ', e);
    }
}

async agregarProfesor() {
  try {
    console.log();
    const form = this.profesorForm.value;
    console.log('Form.values', form);
    const date = new Date(`${form.fecha_nacimiento.year}/${form.fecha_nacimiento.month}/${form.fecha_nacimiento.day}`).toISOString().replace(/T.*/g, "");
    let body = {
      dni: form.dni,
      nombre: form.nombre,
      apellido: form.apellido,
      ciudad: form.ciudad,
      direccion: form.direccion,
      telefono: form.telefono,
      fecha_nacimiento: date,
      genero: form.genero
    };
    console.log('doby ', body);
    await this.profesorService.addProfesor(body);
    this.profesoresList = await this.profesorService.getAllProfesores();
    this.profesorForm.reset();
  } catch (e) {
    console.log('Error agregarAlumno', e);
  }
}

async editarProfesor() {
  try{
    this.legajo_profesor;
    console.log('editar Alumno?', this.legajo_profesor);
    const form = this.profesorForm.value;
    console.log('Form ', form);
    const date = new Date(`${form.fecha_nacimiento.year}/${form.fecha_nacimiento.month}/${form.fecha_nacimiento.day}`).toISOString().replace(/T.*/g, '');
    const body = {
      dni: form.dni,
      nombre: form.nombre,
      apellido: form.apellido,
      ciudad: form.ciudad,
      direccion: form.direccion,
      telefono: form.telefono,
      fecha_nacimiento: date,
    };
    await this.profesorService.updateProfesor(body, this.legajo_profesor);
    this.profesoresList = await this.profesorService.getAllProfesores();
    this.resetForm();
  } catch (e) {
    console.log('error editarAlumno', e);
  }
}

resetForm() {
  this.profesorForm.reset();
  this.editar = false;
}

}
