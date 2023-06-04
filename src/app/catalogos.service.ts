import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(
    private http: HttpClient
  ) {}

  getAll(){
    return this.http.get("http://localhost:8080/catalogo")
  }

  create(catalogo: any){
    return this.http.post("http://localhost:8080/catalogo", catalogo)
  }

  update(catalogo: any){
    return this.http.post("http://localhost:8080/catalogo", catalogo)
  }

  delete(id: number){
    return this.http.delete("http://localhost:8080/catalogo/" + id)
  }
}
