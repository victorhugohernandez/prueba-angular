import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes: any[] = [];
  private copiaClientes: any[] = [];
  public formGroup: FormGroup;
  public grid: boolean = true;
  public edicion: boolean = false;
  
  constructor(private clienteService: ClienteService,
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        id: ['', []],
        estado: ['', []],
        nombre: ['', [Validators.required]],
        idCliente: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        contrasenia: ['', [Validators.required]],
        genero: ['', [Validators.required]],
        identificacion: ['', [Validators.required]],
        edad: ['', [Validators.required]],
      });
     }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe(c => {
      this.clientes = c;
      this.copiaClientes = [...this.clientes];
    })
  }

  buscar(cadena: any) {
    this.clientes = this.copiaClientes.filter(c => {
      return c.nombre.toLowerCase().includes(cadena.value.toLowerCase());
    })
  }
  
  nuevo() {
    this.grid = false;
  }

  onSubmit() {
    let cliente = this.formGroup.value;
    cliente['estado'] = true;

    this.clienteService.save(cliente).subscribe(result => {
      this.grid = true;
      this.ngOnInit();
    }, error => alert(error.error.message));
  }

  cancelar() {
    this.grid = true;
  }

  eliminar(cliente: any) {

    this.clienteService.delete(cliente).subscribe((result: any) => {
      alert(result.mensaje);
      this.ngOnInit();
    });
  }

  editar(cliente: any) {
    this.edicion = true;
    this.grid = false;
    this.formGroup.setValue(cliente);
  }

  edit() {
    let cliente = this.formGroup.value;

    this.clienteService.edit(cliente).subscribe(result => {
      this.grid = true;
      this.edicion = false;
      this.ngOnInit();
    });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
