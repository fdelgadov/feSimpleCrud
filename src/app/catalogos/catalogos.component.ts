import { Component, OnInit } from '@angular/core';
import { CatalogosService } from '../catalogos.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {
  catalogos: any[] = []
  formulario: FormGroup = this.fb.group({
    tipo: [],
    valor: []
  })
  constructor(
    private cs: CatalogosService,
    private fb: FormBuilder
  ){}
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.cs.getAll().subscribe((c: any) => {
      console.log("catalogos", c);
      this.catalogos = c;
    })
  }

  save(): void{
    const v = this.formulario.value;
    console.log('values', v);
    this.cs.create(v).subscribe(() => {
      this.getAll();
      this.clean();
    })
  }

  delete(id: number): void {
    const ok = confirm("¿Seguro que desea eliminar este catálogo?");
    if (ok) {
      this.cs.delete(id).subscribe(() => {
        this.getAll();
      })
    }
  }

  update(): void {

    
  }

  clean(): void {
    this.formulario.setValue({
      "tipo": null,
      "valor": null
    })
  }
}
