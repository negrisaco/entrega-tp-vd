import { ConfigurationService } from '../../services/configuration.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MateriaService {
materiaExtension: string = 'materia';
materiaProfesorExtension: string = 'materia-profesor';
alumnoMateriaExtension: string = 'alumno-materia';
alumnoCursaMateriaExtension: string = 'alumno_cursa_materia';

constructor(
    private http: Http,
    private configuration: ConfigurationService
) {}
    getMateriasProfesor(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.configuration.ServerWithApiUrl}${this.materiaProfesorExtension}`).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    getAllMaterias(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.configuration.ServerWithApiUrl}${this.materiaExtension}`).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    deleteMateria(id: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.delete(`${this.configuration.ServerWithApiUrl}${this.materiaExtension}/${id}`).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    addMateria(body): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.configuration.ServerWithApiUrl}${this.materiaExtension}`, body).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    getMateriasCursadas(id): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.configuration.ServerWithApiUrl}${this.alumnoMateriaExtension}/${id}`).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    addMateriaAalumno(body) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.configuration.ServerWithApiUrl}${this.alumnoCursaMateriaExtension}`, body).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    deleteMateriaDeAlumno(legajo, codigo) {
        return new Promise((resolve, reject) => {
            this.http.delete(`${this.configuration.ServerWithApiUrl}${this.alumnoCursaMateriaExtension}/${legajo}/${codigo}`).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    updateMateria(body, id): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.configuration.ServerWithApiUrl}${this.materiaExtension}/${id}`, body).subscribe(res => {
                console.log('res', res);
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }
}
