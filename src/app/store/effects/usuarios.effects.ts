import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usuariosActions from '../actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs'
import { UsuarioService } from "src/app/services/usuario.service";


@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            //tap( data => console.log('effect tap', data) ), // aqu obtenemos la inforacon que esta fluyendo despues del ofType
            mergeMap( // ayuda a disparar un nuevo observable
                () => this.usuarioService.getUsers()
                        .pipe(
                            //tap( data => console.log( 'getUsers effect', data ) )
                            map(users => usuariosActions.cargarUsuariosSuccess({usuarios: users}),
                                catchError( err => of(usuariosActions.cargarUsuariosError({ payload: err })) )
                            )
                        )
            ) 
        )
    );
}