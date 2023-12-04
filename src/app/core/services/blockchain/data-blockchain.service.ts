import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataBlockchainService {

  private readonly infuraApiKey = environment.apiKey; // Reemplaza con tu clave de API de Infura
  private readonly infuraUrl = environment.infuraURL;

  constructor(private http: HttpClient) { }

  sendDataToBlockchain(data: any){

    const endpoint = `${this.infuraUrl}${this.infuraApiKey}`;
    const body = JSON.stringify({

      to: '0x11B52421dbb9c9772D4700F81E3ac1CeCB71A8b8',
      value: 500000000000, // Recuerda convertir el valor a Wei (1 Ether = 10^18 Wei)
      gas: 21000, // Puedes estimar el gas necesario para la transacción
      gasPrice: 1000000000,
      data: data
      // Otros campos de la transacción como data, nonce, etc., según sea necesario
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(endpoint, body, { headers })
      .pipe(map(
        (response)=> response,
        (error:any)=> error
      ));
  }
}
