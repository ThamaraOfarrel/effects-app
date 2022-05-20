import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'https://reqres.in/api'

  constructor(
              private http: HttpClient
              ) { }

  getUsers() {
    return this.http.get(`${this.url}/users?per_page=6&delay=5`) // &delay=3; espera 3segundos para empezar a cargar informacon
            .pipe(
              map( (resp:any) => 
                resp['data']
              )
            )
  }

  getUserById( id: string ) {
    return this.http.get(`${this.url}/users/${id}`) // &delay=3; espera 3segundos para empezar a cargar informacon
            .pipe(
              map( (resp:any) => 
                resp['data']
              )
            )
  }
}
