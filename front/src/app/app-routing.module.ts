import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthGuard } from './services/AuthGuard.service';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { VenteComponent } from './vente/vente.component';
import { AchatComponent } from './achat/achat.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ClientComponent } from './client/client.component';
import { StockComponent } from './stock/stock.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'home' , component : HomeComponent},
  {path : 'accueil' , canActivate : [AuthGuard] , component : AccueilComponent},
  {path : 'fournisseur' , canActivate : [AuthGuard] , component : FournisseurComponent},
  {path : 'vente' ,canActivate : [AuthGuard] ,  component : VenteComponent},
  {path : 'achat' , canActivate : [AuthGuard] ,component : AchatComponent},
  {path : 'client' ,canActivate : [AuthGuard] , component : ClientComponent},
  {path : 'statistique' , canActivate : [AuthGuard] ,component : StatistiqueComponent},
  {path : 'stock' , canActivate : [AuthGuard] ,component : StockComponent},
  {path : 'admin' , canActivate : [AuthGuard] ,component : AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
