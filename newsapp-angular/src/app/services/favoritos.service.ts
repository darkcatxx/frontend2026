import { Injectable, signal } from '@angular/core';

const CLAVE = 'newsapp_favoritos';

// Guarda en localStorage los ids de las noticias favoritas
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private _ids = signal<number[]>(this.leer());
  readonly ids = this._ids.asReadonly();

  private leer(): number[] {
    const guardados = localStorage.getItem(CLAVE);
    return guardados ? (JSON.parse(guardados) as number[]) : [];
  }

  esFavorito(id: number): boolean {
    return this._ids().includes(id);
  }

  alternar(id: number): void {
    const actuales = this._ids();
    const nuevos = actuales.includes(id) ? actuales.filter((f) => f !== id) : [...actuales, id];
    this._ids.set(nuevos);
    localStorage.setItem(CLAVE, JSON.stringify(nuevos));
  }
}
