import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div>
          <strong>NewsApp</strong>
          <p>Plataforma web de noticias, proyecto del módulo de Front-end.</p>
        </div>
        <div>
          <p>
            <a routerLink="/noticias">Noticias</a> &nbsp; <a routerLink="/favoritos">Favoritos</a> &nbsp;
            <a routerLink="/contacto">Contacto</a>
          </p>
          <p>contacto@newsapp.com<br />+57 300 000 0000</p>
        </div>
        <div><p>&copy; {{ anio }} NewsApp</p></div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  anio = new Date().getFullYear();
}
