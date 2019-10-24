import { Component, OnInit, ViewChild} from '@angular/core';
import { MateriaService } from './materia.service';
import { ProfesorService } from '../profesor/profesor.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {

  materiaForm: FormGroup;
  editar:boolean = false;
  codigo_materia:string;
  accentedCharacters =
  "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ' .";

  constructor(private materiaService: MateriaService, private profesorService: ProfesorService) {
    this.materiaForm = new FormGroup({
      nombreMateria: new FormControl('', [Validators.required, Validators.max(100), Validators.pattern("^[a-zA-Z" + this.accentedCharacters + "0-9]+$")]),
      profesor: new FormControl('', Validators.required)
    });
  }

  materiasList = [];
  profesoresList = [];

  async ngOnInit() {
    try {
      this.materiasList = await this.materiaService.getMateriasProfesor();
      this.profesoresList = await this.profesorService.getAllProfesores();
    } catch (e) {
      console.log('error ngOnInit ', e);
    }
  }

  async agregarMateria() {
    console.log('FORM ', this.materiaForm);
    const body = {
    nombre: this.materiaForm.controls.nombreMateria.value,
    legajo_profesor_a: this.materiaForm.controls.profesor.value.legajo_profesor
  };
    await this.materiaService.addMateria(body);
    this.materiasList = await this.materiaService.getMateriasProfesor();
  }

  async esEditar(materia) {
    console.log('materia ', materia);
    this.editar = true;
    this.codigo_materia = materia.codigo_materia;
    let materiaObj = {};
    materiaObj['nombreMateria'] = materia.nombre_materia;
    materiaObj['profesor'] = await this.profesoresList.find(p => { return p.legajo_profesor == materia.legajo_profesor});
    console.log('EDITAR? ', materiaObj);
    this.materiaForm.setValue(materiaObj);
  }

  resetForm() {
    this.materiaForm.reset();
    this.editar = false;
  }

  async borrarMateria(codigoMateria) {
    try {
      console.log('codigo de materia ', codigoMateria);
      await this.materiaService.deleteMateria(codigoMateria);
      this.materiasList = await this.materiaService.getMateriasProfesor();
    } catch (e) {
      console.log('Error delete ', e);
    }
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.legajo_profesor === c2.legajo_profesor
    && c1.nombre_profesor === c2.nombre_profesor
    && c1.apellido_profesor === c2.apellido_profesor : c1 === c2;
}

  async editarMateria() {
    try{
      this.codigo_materia;
      console.log('editar Materia', this.codigo_materia);
      const form = this.materiaForm.value;
      console.log('Form ', form);
      const body = {
        nombre: form.nombreMateria,
        legajo_profesor_a: form.profesor.legajo_profesor,
      };
      await this.materiaService.updateMateria(body, this.codigo_materia);
      this.materiasList = await this.materiaService.getMateriasProfesor();
      this.resetForm();
    } catch (e) {
      console.log('error editarAlumno', e);
    }
  }
}
