import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ReporteService } from './reporte.service';

describe('ReporteService', () => {
  let service: ReporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ReporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
