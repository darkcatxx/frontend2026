import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container">
        <a routerLink="/" class="logo">News<span>App</span></a>
        <nav class="main-nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
          <a routerLink="/noticias" routerLinkActive="active">Noticias</a>
          <a routerLink="/favoritos" routerLinkActive="active">Favoritos ({{ favoritos.ids().length }})</a>
          <a routerLink="/nosotros" routerLinkActive="active">Nosotros</a>
          <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  constructor(public favoritos: FavoritosService) {}
}
