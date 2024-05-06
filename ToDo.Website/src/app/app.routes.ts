import {mapToCanActivate, Routes} from '@angular/router';
import {TodoListComponent} from "./todolist/todolist.component";
import {provideEffects} from "@ngrx/effects";
import {TodoEffects} from "./store/todo.effects";
import {AuthGuard, AuthService} from "@auth0/auth0-angular";
import {AlltodosComponent} from "./alltodos/alltodos.component";
import {HomeComponent} from "./home-component/home.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [ mapToCanActivate([AuthGuard])],
    providers: [provideEffects([TodoEffects]), AuthService]
  },
  {
    path: 'todos',
    component: TodoListComponent,
   // canActivate: [ mapToCanActivate([AuthGuard])],
    providers: [provideEffects([TodoEffects]), AuthService]
  },
  {
    path: 'alltodos',
    component: AlltodosComponent,
    // canActivate: [ mapToCanActivate([AuthGuard])],
    providers: [provideEffects([TodoEffects]), AuthService]
  }
];
