import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientoService } from 'src/app/services/movimiento.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  public records: any[] = [];
  private copyRecords: any[] = [];
  public formGroup: FormGroup;
  public grid: boolean = true;
  public edicion: boolean = false;

  constructor(private movimientoService: MovimientoService,
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        numeroCuenta: ['', [Validators.required]],
        tipoMovimiento: ['', [Validators.required]],
        fecha: ['', []],
        valor: ['', [Validators.required]],
        saldo: ['', []],
      });
     }

  ngOnInit(): void {
    this.movimientoService.findAll().subscribe(response => {
      this.records = response;
      this.copyRecords = [...this.records];
    });
  }

  editar(record: any) {

  }

  eliminar(record: any) {

  }

  onSubmit() {
    let record = this.formGroup.value;
    const r = {numeroCuenta: {numeroCuenta: record.numeroCuenta}, tipoMovimiento: record.tipoMovimiento, valor: record.valor }
    record['fecha'] = new Date();
    
    this.movimientoService.save(record).subscribe(response => {
      this.grid = true;
      this.ngOnInit();
    }, error => {
      this.grid = true;
      alert(error.error.mensaje);
      }
    );
  }

  cancelar() {
    this.grid = true;
  }

  edit() {
  }

  buscar(cadena: any) {
    if(cadena.value === "") {
      this.records = this.copyRecords;
    } else {
      this.records = this.copyRecords.filter(c => {
        const n: string = c.numeroCuenta.numeroCuenta;
        return cadena.value.toLowerCase().includes(n);
      });
    }
  }

  nuevo() {
    this.grid = false;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  numberMinusOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 45) {
      return false;
    }
    return true;
  }
}
