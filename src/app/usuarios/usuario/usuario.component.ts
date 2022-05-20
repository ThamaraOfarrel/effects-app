import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  usuario!: Usuario | null;
  loading: Boolean = false;
  error: any ;


  constructor(
              private router: ActivatedRoute,
              private store: Store<AppState>
              ) { }

  ngOnInit(): void {
    this.router.params.subscribe( 
        ({id}) =>{ 
          this.store.dispatch( cargarUsuario({id}) )
     } )

     this.cargarUsuario();   

  }

  cargarUsuario(){
        this.store.select('usuario').subscribe( ({ user, loading, error })=> {
        this.usuario = user;
        this.loading   = loading;
        this.error    = error;
      });
   }

}
