import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "clientes",
        component: ClientesComponent
      },
      {
        path: "movimientos",
        component: MovimientosComponent
      },
      {
        path: "reportes",
        component: ReportesComponent
      },
      {
        path: "cuentas",
        component: CuentasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
