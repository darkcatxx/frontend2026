import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../services/noticias.service';
import { FavoritosService } from '../services/favoritos.service';
import { NoticiaCardComponent } from '../components/noticia-card.component';

@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, NoticiaCardComponent],
  template: `
    <section class="section">
      <div class="section-title"><h2>Mis noticias favoritas</h2></div>
      <div class="grid">
        @for (n of favoritas(); track n.id) {
          <app-noticia-card [noticia]="n" />
        } @empty {
          <p class="vacio">
            Todavía no has guardado ninguna noticia en favoritos.
            <a class="link-btn" routerLink="/noticias">Explorar noticias</a>
          </p>
        }
      </div>
    </section>
  `,
})
export class FavoritosComponent {
  private noticias = inject(NoticiasService);
  private favs = inject(FavoritosService);

  favoritas = computed(() => this.noticias.noticias().filter((n) => this.favs.ids().includes(n.id)));
}
