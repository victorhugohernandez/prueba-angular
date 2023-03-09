import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    MovimientosComponent,
    ReportesComponent,
    CuentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
