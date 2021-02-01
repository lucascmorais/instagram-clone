import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { BannerComponent } from './layout/acesso/banner/banner.component';
import { LoginComponent } from './layout/acesso/login/login.component';
import { CadastroComponent } from './layout/acesso/cadastro/cadastro.component';
import { AcessoComponent } from './layout/acesso/acesso.component';
import { HomeComponent } from './layout/home/home.component';
import { PublicacoesComponent } from './layout/home/publicacoes/publicacoes.component';
import { IncludePublicationComponent } from './layout/home/include-publication/include-publication.component';

// Guard
import { AuthGuard } from './_guards/auth.guard';

// Services
import { ProgressService } from './_services/progress.service';
import { PublicationService } from './_services/publication.service';
import { AuthService } from './_services/auth.service';


// Configurações do Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    AcessoComponent,
    HomeComponent,
    PublicacoesComponent,
    IncludePublicationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ AuthService, AngularFireAuth, AuthGuard, PublicationService, ProgressService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
