import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * Configuração específica para renderização no servidor.
 */
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

/**
 * Combina a configuração principal da aplicação com a configuração do servidor.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
