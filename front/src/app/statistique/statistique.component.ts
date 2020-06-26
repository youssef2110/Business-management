import { Component, OnInit} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  title = "Statistique"
  stat = false;
  stat2 = false;
  ventes =[];
  vente ;
  achats =[];
  achat ;
  load = false;
  month = [];
  month2 = [];
  test ;
  test2;
  lineChartData: ChartDataSets[] = [
    { data: this.month, label: 'Nombre des ventes' },
  ];
  lineChartData2: ChartDataSets[] = [
    { data: this.month2, label: 'Nombre des achats' },
  ];
  lineChartLabels: Label[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'November', 'Decembre'];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,155,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private http: HttpClient){

  }
  ngOnInit() {
    this.http.get("/api/getvente").subscribe((res) => {
      this.vente = res;
      this.load = true;
      var a = 0
      this.test = 0;
      for (var i = 1; i <= 12 ; i++) {
        for(var j = 0; j < this.vente.length ; j++){
        let regex = new RegExp('[0-9]*-'+i+'-[0-9]*');
        if(regex.test(this.vente[j].date)){
          this.ventes[a]=this.vente[j];
          a++;
          
        }
        
      }
      this.month[i-1] = this.ventes.length - this.test ;
      this.test = this.ventes.length
      console.log(this.month[i]);
      }
      
    });
    this.http.get("/api/getachat").subscribe((res) => {
      this.achat = res;
      this.load = true;
      var a = 0
      this.test2 = 0;
      for (var i = 1; i <= 12 ; i++) {
        for(var j = 0; j < this.achat.length ; j++){
        let regex = new RegExp('[0-9]*-'+i+'-[0-9]*');
        if(regex.test(this.achat[j].date)){
          this.achats[a]=this.achat[j];
          a++;
          
        }
        
      }
      this.month2[i-1] = this.achats.length - this.test2 ;
      this.test2 = this.achats.length
      console.log(this.month2[i]);
      }
      
    });
  }
  s(){
    this.stat = !this.stat;
  }
  s2(){
    this.stat2 = !this.stat2;
  }
 
}
