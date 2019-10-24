import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlumnoService } from './alumno.service';
import { MateriaService } from '../materia/materia.service';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {

  alumnoForm: FormGroup;
  alumnoMateriasForm: FormGroup;
  accentedCharacters =
  "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ' .";

  constructor(private alumnoService: AlumnoService, private materiaService: MateriaService) {

      this.alumnoForm = new FormGroup({
        dni: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.pattern('[0-9]*')]),
        nombre: new FormControl('', [Validators.required, Validators.max(25), Validators.pattern("^[a-zA-Z" + this.accentedCharacters + "]+$")]),
        apellido: new FormControl('', [Validators.required, Validators.max(50), Validators.pattern("^[a-zA-Z" + this.accentedCharacters + "]+$")]),
        ciudad: new FormControl('', [Validators.required, Validators.max(25), Validators.pattern("^[a-zA-Z" + this.accentedCharacters + "]+$")]),
        direccion: new FormControl('', [Validators.required, Validators.max(50), Validators.pattern("^[a-zA-Z" + this.accentedCharacters + "0-9]+$")]),
        telefono: new FormControl('', [Validators.maxLength(9), Validators.pattern('[0-9]*')]),
        fecha_nacimiento: new FormControl('', [Validators.required]),
        genero: new FormControl('', [Validators.required])
    });

      this.alumnoMateriasForm = new FormGroup({
        materia: new FormControl('', [Validators.required])
    });
  }

  alumnosList = [];
  materiaTotalList = [];
  materiasList = [];
  legajo:string;
  editar:boolean = false;

  async ngOnInit() {
    try {
      this.alumnosList = await this.alumnoService.getAllAlumnos();
      this.materiaTotalList = await this.materiaService.getAllMaterias();
      console.log('materias ', this.materiaTotalList);
    } catch (e) {
      console.log('Error ngOnInit ', e);
    }
  }

  async agregarAlumno() {
    try {
      console.log();
      const form = this.alumnoForm.value;
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
        genero: form.genero
      };
      console.log('doby ', body);
      await this.alumnoService.addAlumno(body);
      this.alumnosList = await this.alumnoService.getAllAlumnos();
      this.alumnoForm.reset();
    } catch (e) {
      console.log('Error agregarAlumno', e);
    }
  }

  resetForm() {
    this.alumnoForm.reset();
    this.alumnoMateriasForm.reset();
    this.editar = false;
  }

  async borrarAlumno(legajoAlumno) {
    try {
      await this.alumnoService.deleteAlumno(legajoAlumno);
      this.alumnosList = await this.alumnoService.getAllAlumnos();
    } catch (e) {
      console.log('Error delete ', e);
    }
  }

  esEditar(alumno) {
    this.editar = true;
    this.legajo = alumno.legajo;
    let alumnoObj = {};
    let formatoFecha = alumno.fecha_nacimiento.split('T')[0].split('-');
    alumnoObj['fecha_nacimiento'] = {year: parseInt(formatoFecha[0]), month: parseInt(formatoFecha[1]), day: parseInt(formatoFecha[2])};
    alumnoObj['dni'] = alumno.dni;
    alumnoObj['nombre'] = alumno.nombre;
    alumnoObj['apellido'] = alumno.apellido;
    alumnoObj['ciudad'] = alumno.ciudad;
    alumnoObj['direccion'] = alumno.direccion;
    alumnoObj['telefono'] = alumno.telefono;
    alumnoObj['genero'] = alumno.genero;
    console.log('EDITAR? ', alumnoObj);
    this.alumnoForm.setValue(alumnoObj);
  }

  async borrarMateria(codigoDeMateria) {
    try {
      await this.materiaService.deleteMateriaDeAlumno(this.legajo, codigoDeMateria);
      this.materiasList = await this.materiaService.getMateriasCursadas(this.legajo);
    } catch (e) {
      console.log('error borrarMateria ', e);
    }
  }

  async cargarListaMaterias(legajoAlumno) {
    this.legajo = legajoAlumno;
    console.log('Legajo ', legajoAlumno);
    this.materiasList = await this.materiaService.getMateriasCursadas(legajoAlumno);
    console.log('lista de materias ', this.materiasList);
  }

  async agregarMateria() {
    try {
      const body = {
        codigo_materia_a: this.alumnoMateriasForm.controls.materia.value.codigo_materia,
        legajo_a: this.legajo
      };
      this.materiaService.addMateriaAalumno(body);
      this.materiasList = await this.materiaService.getMateriasCursadas(this.legajo);
    } catch (e) {
      console.log('error Agregar Materia ', e);
    }
  }

  async editarAlumno() {
    try{
      this.legajo;
      const form = this.alumnoForm.value;
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
        genero: form.genero
      };
      await this.alumnoService.updateAlumno(body, this.legajo);
      this.alumnosList = await this.alumnoService.getAllAlumnos();
      this.resetForm();
    } catch (e) {
      console.log('error editarAlumno', e);
    }
  }
}
