import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../services/noticias.service';
import { NoticiaCardComponent } from '../components/noticia-card.component';

@Component({
  selector: 'app-noticias',
  imports: [FormsModule, NoticiaCardComponent],
  template: `
    <section class="section">
      <div class="section-title"><h2>Listado de noticias</h2></div>

      <div class="filtros">
        @for (cat of categoriasFiltro(); track cat) {
          <button class="filtro-btn" [class.active]="cat === categoriaActiva()" (click)="categoriaActiva.set(cat)">
            {{ cat }}
          </button>
        }
      </div>

      @if (servicio.cargando()) {
        <p class="vacio">Cargando noticias...</p>
      } @else {
        <div class="grid">
          @for (n of filtradas(); track n.id) {
            <app-noticia-card [noticia]="n" [permitirEliminar]="true" (eliminar)="confirmarEliminar($event)" />
          } @empty {
            <p class="vacio">No hay noticias en esta categoría todavía.</p>
          }
        </div>
      }
    </section>

    <section class="crear-noticia">
      <h2>Publicar una nueva noticia</h2>
      <form #f="ngForm" (ngSubmit)="crear(f)">
        <div class="form-grid">
          <div class="campo">
            <label for="titulo">Título *</label>
            <input id="titulo" name="titulo" [(ngModel)]="nueva.titulo" required />
          </div>
          <div class="campo">
            <label for="categoria">Categoría *</label>
            <input id="categoria" name="categoria" [(ngModel)]="nueva.categoria" placeholder="Ej: Tecnológica" required />
          </div>
        </div>
        <div class="campo">
          <label for="imagen">URL de la imagen</label>
          <input id="imagen" name="imagen" [(ngModel)]="nueva.imagen" placeholder="https://..." />
        </div>
        <div class="campo">
          <label for="resumen">Descripción *</label>
          <textarea id="resumen" name="resumen" [(ngModel)]="nueva.resumen" required></textarea>
        </div>
        <button type="submit" class="btn" [disabled]="f.invalid">Publicar noticia</button>
      </form>
    </section>
  `,
})
export class NoticiasComponent {
  servicio = inject(NoticiasService);
  categoriaActiva = signal('Todas');

  categoriasFiltro = computed(() => ['Todas', ...this.servicio.categorias()]);
  filtradas = computed(() =>
    this.categoriaActiva() === 'Todas'
      ? this.servicio.noticias()
      : this.servicio.noticias().filter((n) => n.categoria === this.categoriaActiva()),
  );

  nueva = { titulo: '', categoria: '', resumen: '', imagen: '' };

  confirmarEliminar(id: number): void {
    if (confirm('¿Eliminar esta noticia del catálogo?')) {
      this.servicio.eliminar(id);
      if (!this.categoriasFiltro().includes(this.categoriaActiva())) {
        this.categoriaActiva.set('Todas');
      }
    }
  }

  crear(formulario: { valid: boolean | null; resetForm: () => void }): void {
    if (!formulario.valid) return;
    this.servicio.crear(this.nueva);
    formulario.resetForm();
    this.nueva = { titulo: '', categoria: '', resumen: '', imagen: '' };
  }
}
