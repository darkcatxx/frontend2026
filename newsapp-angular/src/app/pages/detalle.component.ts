import { Component, computed, inject, input } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../services/noticias.service';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink, DatePipe, UpperCasePipe],
  template: `
    <section class="section">
      @if (noticia(); as n) {
        <a class="detalle-volver" routerLink="/noticias">&larr; Volver al listado</a>
        <img class="detalle-img" [src]="n.imagen" [alt]="n.titulo" />
        <span class="card-category">{{ n.categoria | uppercase }}</span>
        <h1>{{ n.titulo }}</h1>
        <p class="detalle-meta">Publicado el {{ n.fecha | date: "d 'de' MMMM 'de' y" }}</p>
        <p class="detalle-contenido">{{ n.contenido }}</p>
        <div class="detalle-acciones">
          <button class="btn" [class.danger]="favoritos.esFavorito(n.id)" (click)="favoritos.alternar(n.id)">
            {{ favoritos.esFavorito(n.id) ? '★ Quitar de favoritos' : '☆ Agregar a favoritos' }}
          </button>
          <a class="btn secondary" routerLink="/contacto">Ir a contacto</a>
        </div>
      } @else if (servicio.cargando()) {
        <p class="vacio">Cargando noticia...</p>
      } @else {
        <p class="vacio">La noticia solicitada no existe o fue eliminada.</p>
        <a class="detalle-volver" routerLink="/noticias">&larr; Volver al listado</a>
      }
    </section>
  `,
})
export class DetalleComponent {
  servicio = inject(NoticiasService);
  favoritos = inject(FavoritosService);

  // id que viene de la ruta /noticias/:id
  id = input<string>();

  noticia = computed(() => {
    const id = Number(this.id());
    return this.servicio.noticias().find((n) => n.id === id);
  });
}
