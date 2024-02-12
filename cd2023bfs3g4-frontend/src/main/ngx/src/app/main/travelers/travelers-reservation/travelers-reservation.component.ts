import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ODateInputComponent, ODateRangeInputComponent, OFormComponent, OSnackBarConfig, OTextInputComponent, OntimizeService, SnackBarService } from 'ontimize-web-ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-travelers-reservation',
  templateUrl: './travelers-reservation.component.html',
  styleUrls: ['./travelers-reservation.component.css']
})
export class TravelersReservationComponent implements OnInit {

  public selectedDates = {};

  @ViewChild('form', { static: true }) form: OFormComponent;
  @ViewChild('message', { static: true }) messagefield: OTextInputComponent;
  @ViewChild('id_client_host', { static: true }) id_client_host: OTextInputComponent;
  @ViewChild('date', { static: true }) date: ODateInputComponent;
  @ViewChild('daterange1', { static: true }) daterangefield: ODateRangeInputComponent;
  public messageString:string;
  public today: number;
  public todayStringWithFormat;
   

  public id_host: number;


  constructor(

  
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialog: MatDialog,
    private snackBarService: SnackBarService,
    
    private ontimizeServiceUsers: OntimizeService
  ) { 

   
      
  
    this.ontimizeServiceUsers.configureService(this.ontimizeServiceUsers.getDefaultServiceConfiguration('users'));
  }
 
 

  getData(){
    return this.id_host;
  }

  ngOnInit() {    

    const currentDate: Date = new Date();   
  


const day: number = currentDate.getDate();
const month: number = currentDate.getMonth() + 1; 
const year: number = currentDate.getFullYear();

const dateString: string = `${day}/${month}/${year}`;
this.todayStringWithFormat = dateString;
console.log(this.todayStringWithFormat);


    this.today = Date.now();   

    this.id_host = this.data.id_client_host;
    console.log("id_host:")
    console.log(this.id_host);
   
  }



  
  sendReservation(){

    this.form.insert();

  }

  reservationCreated(){
    this.dialog.closeAll();
    const config: OSnackBarConfig = {
      action: 'OK',
      milliseconds: 5000,
      icon: 'check_circle_outline',
      iconPosition: 'left'
    };
    this.snackBarService.open('Petición enviada', config);

  };








  //-----------------SEND RESERVATION MANUALMENTE (ANTES DE QUE USASEMOS EL FORM INSERT (PUEDE QUE NO ESTE COMPLETA)) ---------

  // sendReservation() {

  //   this.messageString = this.messagefield.getValue();
  //   let id_client_host = this.data.id_client_host;
  //   let date = this.date.getValueAsDate();
  //   let read_traveler = true;
  //   let read_host = false;

  //   let reservation_start = this.daterangefield.getValue().startDate['_d'];
  //   let reservation_end = this.daterangefield.getValue().endDate['_d'];

    
  //   let hashmap: { [key: string]: any } = {};
  //   hashmap['message'] = this.messageString;
  //   hashmap['id_client_host'] = id_client_host;
  //   hashmap['reservation_date'] = date;
  //   hashmap['read_traveler'] = read_traveler;
  //   hashmap['read_host'] = read_host;
  //   hashmap['reservation_start'] = reservation_start;
  //   hashmap['reservation_end'] = reservation_end;



 
  //   console.log(hashmap);
    
  
  //   this.ontimizeServiceUsers.insert(hashmap,'reservation').subscribe(res => {

  //     this.dialog.closeAll();

  //     if (res.code == 0) {        
  //       // Mostrar el snack-bar con el mensaje de éxito
  //       const config: OSnackBarConfig = {
  //         action: 'OK',
  //         milliseconds: 5000,
  //         icon: 'check_circle_outline',
  //         iconPosition: 'left'
  //       };
  //       this.snackBarService.open('Petición enviada', config);
  //     } else {
  //       // Mostrar el snack-bar con el mensaje de error
  //       this.snackBarService.open(`Error: ${res.message}`, { milliseconds: 5000 });
  //     }

  //   });

   
  
   
  // }


}
