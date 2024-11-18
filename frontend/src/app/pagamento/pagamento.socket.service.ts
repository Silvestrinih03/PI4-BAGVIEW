import { Injectable } from '@angular/core';
import { Socket } from 'net';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private client: Socket;

  constructor() {
    this.client = new Socket();
  }

  connectToServer(host: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.connect(port, host, () => {
        console.log('Conectado ao servidor!');
        resolve();
      });

      this.client.on('error', (err: Error) => {
        console.error('Erro na conexão:', err.message);
        reject(err);
      });
    });
  }

  sendCardData(cardNumber: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Prepara os dados para envio
      const data = JSON.stringify({ numeroCartao: cardNumber });

      // Envia os dados ao servidor
      this.client.write(data, 'utf-8', () => {
        console.log('Dados enviados ao servidor.');
      });

      // Escuta a resposta do servidor
      this.client.on('data', (response: Buffer) => {
        const result = JSON.parse(response.toString());
        console.log('Resposta do servidor:', result);

        // Resolve com o resultado do servidor
        resolve(result.valorResultante);
      });

      // Trata erros
      this.client.on('error', (err: Error) => {
        console.error('Erro ao receber resposta do servidor:', err.message);
        reject(err);
      });
    });
  }
}
