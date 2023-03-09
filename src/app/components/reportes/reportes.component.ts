import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public records: any[] = [];
  private copyRecords: any[] = [];
  public formGroup: FormGroup;
  
  constructor(private reporteService: ReporteService,
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        idCliente: ['', [Validators.required]],
        fechaInicio: ['', [Validators.required]],
        fechaFin: ['', [Validators.required]],
      });
     }

  ngOnInit(): void {
  }

  numberOnly(event: any): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 45) {
      return false;
    }
    return true;
  }

  buscar() {
    const record = this.formGroup.value;

    this.reporteService.find(record).subscribe(response => {
      this.records = response;
    });
  }

  descargar() {
    const record = this.formGroup.value;
    this.reporteService.getPdf(record).subscribe(response => {
      this.downloadPdf(response.mensaje, 'Movimientos')
    })
  }

  downloadPdf(base64String: any, fileName: any) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }

  get f() { return this.formGroup.controls; }
}
