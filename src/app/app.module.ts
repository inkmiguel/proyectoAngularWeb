import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main'; // Import the MainComponent
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way data binding
import { NgChartsModule } from 'ng2-charts'; // <-- Importa el módulo correcto

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
