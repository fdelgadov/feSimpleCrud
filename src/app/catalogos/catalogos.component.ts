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
  editTemp: any
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
    console.log("temp", this.editTemp);
    let request;
    if(!this.editTemp){
      request = this.cs.create(v);
    }
    else{
      request = this.cs.update(this.editTemp.id, v);
    }
    request.subscribe(() => {
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

  edit(c: any): void {
    this.editTemp = c;
    this.formulario.setValue({
      "tipo": c.tipo,
      "valor": c.valor
    });
  }

  clean(): void {
    this.formulario.setValue({
      "tipo": null,
      "valor": null
    })
    this.editTemp = null;
  }
}
