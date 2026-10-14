import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="section-title"><h2>Sobre NewsApp</h2></div>
      <p style="max-width: 72ch;">
        NewsApp es una plataforma web de noticias creada como proyecto del módulo de Desarrollo de Front-end.
        Reúne historias educativas, tecnológicas, turísticas y comerciales en un solo lugar, con un diseño
        sencillo para leer, guardar favoritos y contactarnos.
      </p>
      <p style="max-width: 72ch;">
        Está construida con Angular, JavaScript/TypeScript, HTML y CSS, y guarda la información del usuario
        en el almacenamiento local de su navegador.
      </p>
      <a routerLink="/contacto" class="btn">Escríbenos</a>
    </section>
  `,
})
export class NosotrosComponent {}
