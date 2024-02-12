import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { AuthService, OFormComponent, OSnackBarConfig, SnackBarService, OntimizeService, OTranslateHttpLoader, OTranslateService, OGridComponent } from 'ontimize-web-ngx';
import { MatDialog } from '@angular/material';
import { ReservationSentDetailComponent } from './reservation-sent-detail/reservation-sent-detail.component';
import { ReservationReceivedDetailComponent } from './reservation-received-detail/reservation-received-detail.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-reservation-home',
  templateUrl: './reservation-home.component.html',
  styleUrls: ['./reservation-home.component.css']
})
export class ReservationHomeComponent implements OnInit {



  @ViewChild('form', { static: true }) form: OFormComponent;
  @ViewChild('formHost', { static: true }) formHost: OFormComponent;

  //nuevos  ViewChild
  @ViewChild('gridReservationReceived', { static: true }) gridReservationReceived: OGridComponent;
  @ViewChild('gridReservationSent', { static: true }) gridReservationSent: OGridComponent;
  
  public numberOfMessagesNotReadInSent: number;
  public numberOfMessagesNotReadInReceiv: number;
  public numberOfTotalMessagesNotRead: number;

  public arrayActivitiesClient: string[];
  public arrayActivitiesClientNumber: number[];
  public arrayInvisibleText: number[];

  public maxActivitiesReached: boolean = false;


  validatorsArray: ValidatorFn[] = []; // Array de validadores personalizados
  isPasswordModified: boolean = false; // Indicador de si la contraseña ha sido modificada

  constructor(private auth: AuthService,
    private ontimizeServiceUsers: OntimizeService,
    private snackBarService: SnackBarService,
    protected dialog: MatDialog,
    private translate: OTranslateService) {
    this.ontimizeServiceUsers.configureService(this.ontimizeServiceUsers.getDefaultServiceConfiguration('users'));


    this.validatorsArray.push(this.passwordValidator); // Añadir el validador de contraseña al array
  }

  ngOnInit() {
    this.arrayInvisibleText = [];


    //------------cálculo del numero de mensajes sin leer en cada bandeja:----------------------------

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

        //-----------------fin cálculo del numero de mensajes sin leer en cada bandeja

       

  }

  onLoad() {
    let idclient = this.form.getComponents().id_client.getValue();
    this.ontimizeServiceUsers.query({ id_client: idclient }, ['id_activity', 'activity_name'], 'activity_client').subscribe(
      res => {
        this.arrayActivitiesClient = [];
        this.arrayActivitiesClientNumber = [];
        if (res.data && res.data.length) {
          res.data.forEach(element => {
            this.arrayActivitiesClient.push(element.activity_name);
            this.arrayActivitiesClientNumber.push(element.id_activity);
          });
        }
      }
    );
  }

  hostActive: boolean = false;

  toggleHost(event: any) {
    this.hostActive = event;
  }

  ngAfterViewInit() {
    this.form.queryData({ user_: this.auth.getSessionInfo().user });
    this.formHost.queryData({ user_: this.auth.getSessionInfo().user });
  }

  onPasswordInput() {
    this.isPasswordModified = true; // La contraseña ha sido modificada
  }

  passwordValidator(control: any): any {
    try {
      const password = control.parent ? control.parent.controls['password'].value : null; // Obtener el valor de la contraseña
      const passwordConfirm = control.value; // Obtener el valor de la confirmación de contraseña

      if (password !== passwordConfirm) {
        return { passwordNotMatched: true }; // Las contraseñas no coinciden
      } else if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,}$/.test(password)) {
        return { passwordNotSize: true }; // La contraseña no cumple con los requisitos de tamaño
      } else {
        return null; // La contraseña es válida
      }
    } catch (e) {
      return null;
    }
  }

  passwordMatchValidator(control: any): any {

    try {

      const password = control.parent ? control.parent.controls['password'].value : null; // Obtener el valor de la contraseña
      const passwordConfirm = control.value; // Obtener el valor de la confirmación de contraseña

      return password === passwordConfirm ? null : { passwordNotMatched: true }; // Las contraseñas no coinciden

    } catch (e) {
      return null;
    }

  }

  addActivityFn(a: string, b: number) {
    if (this.arrayActivitiesClient.length < 5 && this.arrayActivitiesClient.length >= 0) {
      this.arrayActivitiesClient.push(a);
      this.arrayActivitiesClientNumber.push(b);
      console.log(this.arrayActivitiesClient);
      console.log(this.arrayActivitiesClientNumber);
      this.maxActivitiesReached = false;
    } else {
      this.maxActivitiesReached = true;
      // Aquí puedes mostrar un mensaje o hacer algo más para notificar al usuario.
    }
  }



  removeActivityFn(a: Object, b: Object) {
    this.arrayActivitiesClient = this.arrayActivitiesClient.filter(item => item !== a);
    this.arrayActivitiesClientNumber = this.arrayActivitiesClientNumber.filter(item => item !== b);
    console.log(this.arrayActivitiesClient);
    console.log(this.arrayActivitiesClientNumber);
  }

  saveActivitiesInDataBase() {
    let idclient = this.form.getComponents().id_client.getValue();
    console.log(idclient);
    this.ontimizeServiceUsers.update({ id_client: idclient }, { activity_ids: this.arrayActivitiesClientNumber }, 'activity_client').subscribe(res => {
      if (res.code == 0) {
        // Mostrar el snack-bar con el mensaje de éxito
        const config: OSnackBarConfig = {
          action: 'OK',
          milliseconds: 5000,
          icon: 'check_circle_outline',
          iconPosition: 'left'
        };
        this.snackBarService.open(this.translate.get('SNACKACTIVITIES'), config);
      } else {
        // Mostrar el snack-bar con el mensaje de error
          this.snackBarService.open(`Error: ${res.message}`, { milliseconds: 5000 });
      }
    });
  }

  public verReservaSent(data: any): void {

    let read_traveler = true;    
    this.ontimizeServiceUsers.update({ id_reservation: data }, { read_traveler:read_traveler }, 'reservation').subscribe(res => {    
        this.gridReservationSent.reloadData();
    });
     
   
    this.dialog.open(ReservationSentDetailComponent, {
      
      height: '750px',
      width: '550px',
      data: {
        id_reservation: data,
        //nuevo data del grid
        grid: this.gridReservationSent
        
      }
    });
  }

  public verReservaRec(data: any): void {    
    let read_host = true;    
    this.ontimizeServiceUsers.update({ id_reservation: data }, { read_host:read_host }, 'reservation').subscribe(res => {    
        this.gridReservationReceived.reloadData();
    });
     
   
    this.dialog.open(ReservationReceivedDetailComponent, {
      
      height: '700px',
      width: '550px',
      data: {
        id_reservation: data,
        //nuevo
        grid: this.gridReservationReceived
      },
    });  
  }

    public verPerfil(id_client: any): void{

      this.dialog.open(ProfileDialogComponent, {
      
        
        width: '950px', /* Ancho fijo */
        height: '680px', /* Altura fija */
        data: {
         id_client:id_client
        
        },
      });  
      
  };


}