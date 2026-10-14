import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../services/noticias.service';
import { NoticiaCardComponent } from '../components/noticia-card.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NoticiaCardComponent],
  template: `
    <section class="hero" style="margin: 0 -24px;">
      <div class="container">
        <h1>Noticias que importan, contadas con claridad</h1>
        <p>Explora historias educativas, tecnológicas, turísticas y comerciales seleccionadas para ti.</p>
        <a routerLink="/noticias" class="btn">Explorar noticias</a>
        &nbsp;
        <a routerLink="/contacto" class="btn secondary">Contactar</a>
      </div>
    </section>

    <section class="section">
      <div class="section-title"><h2>Noticias destacadas</h2></div>
      @if (servicio.cargando()) {
        <p class="vacio">Cargando noticias...</p>
      } @else if (servicio.error()) {
        <p class="vacio">{{ servicio.error() }}</p>
      } @else {
        <div class="grid">
          @for (n of servicio.destacadas(); track n.id) {
            <app-noticia-card [noticia]="n" />
          } @empty {
            <p class="vacio">Aún no hay noticias destacadas.</p>
          }
        </div>
      }
    </section>

    <section class="section">
      <div class="section-title"><h2>Lo que dicen nuestros lectores</h2></div>
      <div class="grid">
        @for (t of testimonios; track t.autor) {
          <blockquote class="card" style="margin: 0; padding: 20px;">
            <p>"{{ t.texto }}"</p>
            <strong>{{ t.autor }}</strong>
          </blockquote>
        }
      </div>
    </section>
  `,
})
export class HomeComponent {
  servicio = inject(NoticiasService);

  testimonios = [
    { autor: 'María P., docente', texto: 'Encuentro en un solo lugar las novedades educativas que necesito para mis clases.' },
    { autor: 'Andrés R., desarrollador', texto: 'Los favoritos me permiten guardar artículos para leerlos con calma más tarde.' },
    { autor: 'Laura G., emprendedora', texto: 'La sección comercial me ha dado ideas para mi negocio.' },
  ];
}
