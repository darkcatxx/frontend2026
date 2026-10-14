import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  template: `
    <section class="section">
      <div class="section-title"><h2>Contacto</h2></div>
      <p>¿Tienes comentarios, sugerencias o quieres reportar un error? Escríbenos.</p>

      @if (enviado()) {
        <div class="confirmacion visible" role="status">
          ¡Gracias! Tu mensaje fue enviado correctamente. Te responderemos pronto.
        </div>
      }

      <form #f="ngForm" class="form-contacto" novalidate (ngSubmit)="enviar(f)">
        <div class="campo" [class.invalido]="mostrarError(nombre)">
          <label for="nombre">Nombre completo *</label>
          <input id="nombre" name="nombre" [(ngModel)]="datos.nombre" #nombre="ngModel" required />
          <span class="error-msg">Por favor ingresa tu nombre.</span>
        </div>

        <div class="campo" [class.invalido]="mostrarError(correo)">
          <label for="correo">Correo electrónico *</label>
          <input id="correo" name="correo" type="email" [(ngModel)]="datos.correo" #correo="ngModel" required email />
          <span class="error-msg">Ingresa un correo electrónico válido.</span>
        </div>

        <div class="campo">
          <label for="asunto">Asunto</label>
          <input id="asunto" name="asunto" [(ngModel)]="datos.asunto" />
        </div>

        <div class="campo" [class.invalido]="mostrarError(mensaje)">
          <label for="mensaje">Mensaje *</label>
          <textarea id="mensaje" name="mensaje" [(ngModel)]="datos.mensaje" #mensaje="ngModel" required></textarea>
          <span class="error-msg">Cuéntanos brevemente tu mensaje.</span>
        </div>

        <button type="submit" class="btn">Enviar mensaje</button>
      </form>
    </section>
  `,
})
export class ContactoComponent {
  datos = { nombre: '', correo: '', asunto: '', mensaje: '' };
  enviado = signal(false);
  private intentoEnvio = false;

  // el error solo se muestra si el campo ya se tocó o se intentó enviar
  mostrarError(campo: { invalid: boolean | null; touched: boolean | null }): boolean {
    return !!campo.invalid && (!!campo.touched || this.intentoEnvio);
  }

  enviar(formulario: NgForm): void {
    this.intentoEnvio = true;
    this.enviado.set(false);
    if (formulario.invalid) return;

    // no hay backend, el envío es simulado
    this.enviado.set(true);
    formulario.resetForm();
    this.intentoEnvio = false;
  }
}
