import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { on } from 'cluster';
import { OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public numberOfMessagesNotReadInSent: number;
  public numberOfMessagesNotReadInReceiv: number;
  public numberOfTotalMessagesNotRead: number;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private ontimizeServiceUsers: OntimizeService
  ) {
    this.ontimizeServiceUsers.configureService(this.ontimizeServiceUsers.getDefaultServiceConfiguration('users'));
  }

  ngOnInit() {

    this.ontimizeServiceUsers.query({}, ['message'], 'read_host_false').subscribe(
      res => {

        if (res.data && res.data.length) {
          this.numberOfMessagesNotReadInReceiv = res.data.length;

        } else {
          this.numberOfMessagesNotReadInReceiv = 0;
        }
        console.log(this.numberOfMessagesNotReadInReceiv);


      });

      this.ontimizeServiceUsers.query({}, ['message'], 'read_traveler_false').subscribe(
        res => {
          if (res.data && res.data.length) {
            this.numberOfMessagesNotReadInSent = res.data.length;
  
          } else {
            this.numberOfMessagesNotReadInSent = 0;
          }
          console.log(this.numberOfMessagesNotReadInSent);
  
          
          this.numberOfTotalMessagesNotRead = this.numberOfMessagesNotReadInReceiv + this.numberOfMessagesNotReadInSent;
          console.log(this.numberOfTotalMessagesNotRead);
     
        });

       




  }


  ngAfterViewInit() {


  }

  navigate() {
    this.router.navigate(['../', 'login'], { relativeTo: this.actRoute });
  }

  getImagePath(townName: string): string {
    // Formatear nombres de las imagenes de ciudades.
    const formatName = (name: string) => {
      // Obviar las tildes y otros caracteres especiales
      name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      // Reemplaza los múltiples espacios con uno solo
      name = name.replace(/\s+/g, ' ');
      // Reemplaza los espacios y caracteres no alfanuméricos por guiones bajos
      return name.toLowerCase().replace(/[\s\W]+/g, '_');
    };

    return `assets/images/towns_image/${formatName(townName)}.png`;
  }


  getImageActivity(activityName: string): string {
    // Formatear nombres de las imagenes de ciudades.
    const formatName = (name: string) => {
        // Obviar las tildes y otros caracteres especiales
        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        // Reemplaza los múltiples espacios con uno solo
        name = name.replace(/\s+/g, ' ');
        // Reemplaza los espacios y caracteres no alfanuméricos por guiones bajos
        return name.toLowerCase().replace(/[\s\W]+/g, '_');
    };

    return `assets/images/activities_image/${formatName(activityName)}.png`;
  }
  
}
