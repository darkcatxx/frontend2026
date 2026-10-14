import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { Noticia } from '../models/noticia.model';
import { FavoritosService } from '../services/favoritos.service';

// Tarjeta de noticia que se usa en varias páginas.
// La noticia llega con input() y, al eliminar, se avisa a la página con output().
@Component({
  selector: 'app-noticia-card',
  imports: [RouterLink, UpperCasePipe],
  template: `
    <article class="card">
      <img class="card-img" [src]="noticia().imagen" [alt]="noticia().titulo" />
      <div class="card-body">
        <span class="card-category">{{ noticia().categoria | uppercase }}</span>
        <h3>{{ noticia().titulo }}</h3>
        <p>{{ noticia().resumen }}</p>
        <div class="card-footer">
          <a class="link-btn" [routerLink]="['/noticias', noticia().id]">Ver más</a>
          <button
            class="fav-btn"
            [class.active]="favoritos.esFavorito(noticia().id)"
            [title]="favoritos.esFavorito(noticia().id) ? 'Quitar de favoritos' : 'Agregar a favoritos'"
            (click)="favoritos.alternar(noticia().id)"
          >
            {{ favoritos.esFavorito(noticia().id) ? '★' : '☆' }}
          </button>
        </div>
        @if (permitirEliminar()) {
          <button class="eliminar-btn" (click)="eliminar.emit(noticia().id)">Eliminar noticia</button>
        }
      </div>
    </article>
  `,
})
export class NoticiaCardComponent {
  favoritos = inject(FavoritosService);
  noticia = input.required<Noticia>();   // property binding
  permitirEliminar = input(false);
  eliminar = output<number>();           // event binding
}
