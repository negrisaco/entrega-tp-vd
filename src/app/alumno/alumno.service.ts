import { ConfigurationService } from '../../services/configuration.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AlumnoService {
alumnoExtension: string = 'alumno';


constructor(
    private http: Http,
    private configuration: ConfigurationService
) {}
    getAllAlumnos(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.configuration.ServerWithApiUrl}${this.alumnoExtension}`).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    deleteAlumno(id: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.delete(`${this.configuration.ServerWithApiUrl}${this.alumnoExtension}/${id}`).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    addAlumno(body): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.configuration.ServerWithApiUrl}${this.alumnoExtension}`, body).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    updateAlumno(body, id): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.configuration.ServerWithApiUrl}${this.alumnoExtension}/${id}`, body).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }
}
