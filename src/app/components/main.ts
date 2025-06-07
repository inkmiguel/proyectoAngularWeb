import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
})
export class MainComponent {
  title = 'Proyecto Angular';

  nombre: string = '';
  materia: string = '';
  tipo: string = 'tareas';
  calificaciones: number[] = [];
  calExamen: number | null = null;

  resultadoTexto: string = '';
  resultadoClase: string = '';
  mostrarResultado: boolean = false;

  agregarCalificacion(): void {
    this.calificaciones.push(0); // valor inicial editable en el input
  }

  eliminarCalificacion(index: number): void {
    this.calificaciones.splice(index, 1);
  }

  evaluar(): void {
    if (this.calificaciones.length === 0) return;

    const suma = this.calificaciones.reduce((a, b) => a + b, 0);
    let promedio: number;

    switch (this.tipo) {
      case 'tareas':
        promedio = suma / this.calificaciones.length;
        break;
      case 'tareas_examen':
        if (this.calExamen === null) return;
        promedio = (suma + this.calExamen) / (this.calificaciones.length + 1);
        break;
      case 'examen':
        if (this.calExamen === null) return;
        promedio = this.calExamen;
        break;
      default:
        promedio = 0;
    }

    this.resultadoTexto = promedio >= 6
      ? `✅ ${this.nombre} puede aprobar la materia con ${promedio.toFixed(1)}`
      : `❌ ${this.nombre} tiene riesgo de no aprobar. Promedio: ${promedio.toFixed(1)}`;
    this.resultadoClase = promedio >= 6 ? 'alert-success' : 'alert-danger';
    this.mostrarResultado = true;
  }
}
