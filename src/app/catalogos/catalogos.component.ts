import { Component, OnInit } from '@angular/core';
import { CatalogosService } from '../catalogos.service';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {
  catalogos: any[] = []
  constructor(
    private cs: CatalogosService
  ){}
  
  ngOnInit(): void {
    this.cs.getAll().subscribe((c: any) => {
      console.log("catalogos", c);
      this.catalogos = c;
    })
  }
}
