import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/**
 * Configuração principal da aplicação Angular.
 * Define os provedores necessários para a inicialização da aplicação.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Configuração das rotas da aplicação
    provideRouter(routes),

    // Hidratação do cliente para melhorar a performance
    provideClientHydration(),

    // Animações assíncronas para otimizar a experiência do usuário
    provideAnimationsAsync(),

    // Provedor para detecção de mudanças baseada em Zone.js
    // Descomente a linha abaixo se precisar habilitar esta funcionalidade
    // provideZoneChangeDetection(),
  ],
};
