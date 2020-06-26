import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/AuthGuard.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { StockComponent } from './stock/stock.component';
import { AchatComponent } from './achat/achat.component';
import { VenteComponent } from './vente/vente.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ClientComponent } from './client/client.component';
import { HeaderComponent } from './header/header.component';
import { Page404Component } from './page404/page404.component';
import {NgxPrintModule} from 'ngx-print';
import { ChartsModule } from 'ng2-charts';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminComponent } from './admin/admin.component';
import { Navbar2Component } from './navbar2/navbar2.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccueilComponent,
    NavbarComponent,
    FournisseurComponent,
    StockComponent,
    AchatComponent,
    VenteComponent,
    StatistiqueComponent,
    ClientComponent,
    HeaderComponent,
    Page404Component,
    AdminComponent,
    Navbar2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule,
    NgxPrintModule,
    NgxPaginationModule,
    ChartsModule,
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
