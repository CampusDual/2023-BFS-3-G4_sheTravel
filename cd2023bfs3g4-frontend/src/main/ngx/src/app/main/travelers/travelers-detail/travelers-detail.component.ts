import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { OFormComponent, OntimizeService } from 'ontimize-web-ngx';
import { TravelersReservationComponent } from '../travelers-reservation/travelers-reservation.component';

@Component({
  selector: 'app-travelers-detail',
  templateUrl: './travelers-detail.component.html',
  styleUrls: ['./travelers-detail.component.css']
})
export class TravelersDetailComponent implements OnInit {

  @ViewChild('form',{static:true}) form:OFormComponent;
  public idtown;
  
  router: Router;
  public arrayActivitiesClient: string[];

  constructor(
    router: Router,
    private ontimizeServiceUsers: OntimizeService,
    protected dialog: MatDialog,) { 
    this.router = router;
    this.ontimizeServiceUsers.configureService(this.ontimizeServiceUsers.getDefaultServiceConfiguration('users'));
  }

  ngOnInit() {
  }

  onLoad(){
    let idclient = this.form.getComponents().id_client.getValue();
    
    this.ontimizeServiceUsers.query({id_client: idclient}, ['id_activity', 'activity_name'], 'activity_client').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.arrayActivitiesClient = [];
          res.data.forEach(element => {
            this.arrayActivitiesClient.push(element.activity_name);
          });
        }
      }      
    );
    this.idtown = this.form.getComponents().id_town.getValue();
   }

  public openReservation(data: any): void {    
    let id_client = this.form.getComponents().id_client.getValue();
    this.dialog.open(TravelersReservationComponent, {
      
      height: '520px',
      width: '520px',
      data: {
        id_client_host: id_client        
      },
    });
  }

/*
  reservationFn(){   
    let id_client = this.form.getComponents().id_client.getValue();
    console.log(id_client);
    this.router.navigate(["main/travelers/reservation", id_client]);
  }
  */
}
