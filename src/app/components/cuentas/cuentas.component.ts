import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  public records: any[] = [];
  private copyRecords: any[] = [];
  public formGroup: FormGroup;
  public grid: boolean = true;
  public edicion: boolean = false;
  public clientes: any[] = [];
  
  constructor(private cuentaService: CuentaService, private clienteService: ClienteService,
    private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      numeroCuenta: ['', [Validators.required]],
      tipoCuenta: ['', [Validators.required]],
      saldoInicial: ['', [Validators.required]],
      idCliente: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
    this.cuentaService.findAll().subscribe(c => {
      this.records = c;
      this.copyRecords = [...this.records];
    });
    this.clienteService.findAll().subscribe(c => {
      this.clientes = c;
    })
  }

  buscar(cadena: any) {
    this.records = this.copyRecords.filter(c => {
      return c.idCliente.nombre.toLowerCase().includes(cadena.value.toLowerCase());
    })
  }
  
  nuevo() {
    this.grid = false;
  }

  onSubmit() {
    let record = this.formGroup.value;
    record['idCliente'] = record.idCliente;
    record['estado'] = true;

    this.cuentaService.save(record).subscribe(result => {
      this.grid = true;
      this.ngOnInit();
    }
    ,error => alert(error.error.message)
    );
  }

  edit() {
    let record = this.formGroup.value;

    this.cuentaService.edit(record).subscribe(result => {
      this.grid = true;
      this.edicion = false;
      this.ngOnInit();
    });
  }

  eliminar(cuenta: any) {

    this.cuentaService.delete(cuenta).subscribe((result: any) => {
      alert(result.mensaje);
      this.ngOnInit();
    },
    error => alert(error.error.message)
    );
  }

  cancelar() {
    this.grid = true;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
