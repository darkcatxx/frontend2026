import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { NoticiasComponent } from './pages/noticias.component';
import { DetalleComponent } from './pages/detalle.component';
import { FavoritosComponent } from './pages/favoritos.component';
import { NosotrosComponent } from './pages/nosotros.component';
import { ContactoComponent } from './pages/contacto.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'NewsApp · Inicio' },
  { path: 'noticias', component: NoticiasComponent, title: 'NewsApp · Noticias' },
  { path: 'noticias/:id', component: DetalleComponent, title: 'NewsApp · Detalle' },
  { path: 'favoritos', component: FavoritosComponent, title: 'NewsApp · Favoritos' },
  { path: 'nosotros', component: NosotrosComponent, title: 'NewsApp · Nosotros' },
  { path: 'contacto', component: ContactoComponent, title: 'NewsApp · Contacto' },
  { path: '**', redirectTo: '' },
];
