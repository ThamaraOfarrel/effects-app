import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuario),
      //tap( data => console.log('effect tap', data) ), // aqu obtenemos la inforacon que esta fluyendo despues del ofType
      concatMap(
        // ayuda a disparar un nuevo observable
        (action) =>
          this.usuarioService.getUserById(action.id).pipe(
            //tap( data => console.log( 'getUsers effect', data ) )
            map(
              (user) => usuariosActions.cargarUsuarioSuccess({ usuario: user }),
              catchError((err) =>
                of(usuariosActions.cargarUsuarioError({ payload: err }))
              )
            )
          )
      )
    )
  );
}
