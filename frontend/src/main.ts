import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component'; // Importe seu LoginComponent

const appConfig = {
  // Use o LoginComponent como a raiz da sua aplicação
  declarations: [AppComponent, LoginComponent],
  providers: [],
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
