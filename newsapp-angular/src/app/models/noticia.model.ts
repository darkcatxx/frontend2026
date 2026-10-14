// Estructura de una noticia (igual a public/noticias.json)
export interface Noticia {
  id: number;
  titulo: string;
  categoria: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fecha: string;
  destacada: boolean;
}
