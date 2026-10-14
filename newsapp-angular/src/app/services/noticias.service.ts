import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../models/noticia.model';

const CLAVE = 'newsapp_noticias';
const IMAGEN_POR_DEFECTO =
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80';

// Aquí está toda la lógica de las noticias. Las páginas solo muestran lo que
// tiene este servicio, así no repito código en cada una. Uso signals para que
// la pantalla se actualice sola cuando cambia la lista.
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private http = inject(HttpClient);

  private _noticias = signal<Noticia[]>([]);
  readonly noticias = this._noticias.asReadonly();
  readonly cargando = signal(true);
  readonly error = signal<string | null>(null);

  // las destacadas (máximo 3) y las categorías se recalculan solas cuando cambia la lista
  readonly destacadas = computed(() => this._noticias().filter((n) => n.destacada).slice(0, 3));
  readonly categorias = computed(() => [...new Set(this._noticias().map((n) => n.categoria))]);

  constructor() {
    this.cargar();
  }

  // Si ya hay noticias en localStorage uso esas, así se conservan las que se
  // crearon o eliminaron. Si es la primera vez las pido al noticias.json.
  private cargar(): void {
    const guardadas = localStorage.getItem(CLAVE);
    if (guardadas) {
      this._noticias.set(JSON.parse(guardadas) as Noticia[]);
      this.cargando.set(false);
      return;
    }
    this.http.get<Noticia[]>('noticias.json').subscribe({
      next: (datos) => {
        this._noticias.set(datos);
        this.guardar();
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el catálogo.');
        this.cargando.set(false);
      },
    });
  }

  private guardar(): void {
    localStorage.setItem(CLAVE, JSON.stringify(this._noticias()));
  }

  porId(id: number): Noticia | undefined {
    return this._noticias().find((n) => n.id === id);
  }

  // crear noticia: el id nuevo es el mayor que haya + 1 para que no se repita
  crear(datos: { titulo: string; categoria: string; resumen: string; imagen: string }): void {
    const lista = this._noticias();
    const nuevoId = lista.length ? Math.max(...lista.map((n) => n.id)) + 1 : 1;
    const nueva: Noticia = {
      id: nuevoId,
      titulo: datos.titulo.trim(),
      categoria: datos.categoria.trim(),
      resumen: datos.resumen.trim(),
      contenido: datos.resumen.trim(),
      imagen: datos.imagen.trim() || IMAGEN_POR_DEFECTO,
      fecha: new Date().toISOString().slice(0, 10),
      destacada: false,
    };
    this._noticias.set([nueva, ...lista]);
    this.guardar();
  }

  // eliminar noticia
  eliminar(id: number): void {
    this._noticias.set(this._noticias().filter((n) => n.id !== id));
    this.guardar();
  }
}
