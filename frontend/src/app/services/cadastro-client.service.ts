import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroClientService {
  private userData: any = null;
  private apiUrl = 'http://localhost:4200/cadastro';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: {
    fullName: string;
    email: string;
    password: string;
    cpf: string;
    idPlan: string;
    card: {
      num: string;
      nome: string;
      val: string;
    }[];
    idFlights: {
      objectId: string;
    }[];
  }): Observable<any> {
    console.log('Dados do usuário para cadastro:', usuario);
    return this.http.post(this.apiUrl, usuario);
  }

}