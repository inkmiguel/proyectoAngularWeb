import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainComponent {
  nombre = '';
  materia = '';
  tipo = 'tareas'; // 'tareas', 'tareas_examen', 'examen'
  calificaciones: number[] = [0];
  calExamen: number | null = null;

  mostrarResultado = false;
  resultadoTexto = '';
  resultadoClase = '';

  // Configuración para la gráfica de barras
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Calificaciones',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
    ],
  };

  agregarCalificacion(): void {
    this.calificaciones.push(0);
  }

  eliminarCalificacion(index: number): void {
    this.calificaciones.splice(index, 1);
  }

  actualizarCalificacion(index: number, inputElement: EventTarget | null): void {
    const input = inputElement as HTMLInputElement;
    let valor = parseFloat(input.value);

    if (isNaN(valor) || valor < 0) valor = 0;
    if (valor > 10) valor = 10;

    this.calificaciones[index] = valor;
  }

  evaluar(): void {
    // Crear etiquetas según el tipo de evaluación
    this.barChartLabels = this.calificaciones.map((_, i) => `Tarea ${i + 1}`);
    if (this.tipo === 'tareas_examen' || this.tipo === 'examen') {
      this.barChartLabels.push('Examen');
    }

    // Preparar datos para la gráfica
    let datosGrafica = [...this.calificaciones];
    if (this.tipo === 'tareas_examen' || this.tipo === 'examen') {
      datosGrafica.push(this.calExamen ?? 0);
    }

    // Actualizar barChartData creando un nuevo objeto para detectar cambios
    this.barChartData = {
      labels: [...this.barChartLabels],
      datasets: [
        {
          label: 'Calificaciones',
          data: [...datosGrafica],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
        }
      ]
    };

    // Cálculo del promedio ponderado simple
    let promedio = 0;
    if (this.tipo === 'tareas') {
      promedio = datosGrafica.reduce((a, b) => a + b, 0) / datosGrafica.length;
    } else if (this.tipo === 'tareas_examen') {
      let tareas = this.calificaciones.reduce((a, b) => a + b, 0) / this.calificaciones.length;
      let examen = this.calExamen ?? 0;
      promedio = tareas * 0.4 + examen * 0.6;
    } else if (this.tipo === 'examen') {
      promedio = this.calExamen ?? 0;
    }

    if (promedio >= 6) {
      this.resultadoTexto = `¡Felicidades ${this.nombre}! Estás aprobando con promedio ${promedio.toFixed(2)}.`;
      this.resultadoClase = 'alert alert-success';
    } else {
      this.resultadoTexto = `Lo siento ${this.nombre}, estás reprobando con promedio ${promedio.toFixed(2)}.`;
      this.resultadoClase = 'alert alert-danger';
    }

    this.mostrarResultado = true;
  }
}
