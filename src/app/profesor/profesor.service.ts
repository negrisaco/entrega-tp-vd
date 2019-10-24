import { ConfigurationService } from '../../services/configuration.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProfesorService {
profesorExtension: string = 'profesor';


constructor(
    private http: Http,
    private configuration: ConfigurationService
) {}
    getAllProfesores(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.configuration.ServerWithApiUrl}${this.profesorExtension}`).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    deleteProfesor(id: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.delete(`${this.configuration.ServerWithApiUrl}${this.profesorExtension}/${id}`).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    addProfesor(body): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.configuration.ServerWithApiUrl}${this.profesorExtension}`, body).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }

    updateProfesor(body, id): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.configuration.ServerWithApiUrl}${this.profesorExtension}/${id}`, body).subscribe(res => {
                console.log('res', res.json());
                return resolve(res.json());
            }, err => {
                return reject(err);
            });
        });
    }
}
