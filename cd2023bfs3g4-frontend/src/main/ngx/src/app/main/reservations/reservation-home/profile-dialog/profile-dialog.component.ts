import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { OFormComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {

  public arrayActivitiesClient: string[];


  @ViewChild ('form', {static:false}) form: OFormComponent;

  public id_client: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialog: MatDialog,
    private ontimizeServiceUsers: OntimizeService
  ) { 

    this.ontimizeServiceUsers.configureService(this.ontimizeServiceUsers.getDefaultServiceConfiguration('users'));
  }

  ngOnInit() {
    this.id_client = this.data.id_client;

    console.log(this.id_client);
  }

  getValue(){
   
    return this.id_client;
  }

  ngAfterViewInit(){
    this.form.queryData({id_client: this.id_client});
  }

  onLoad(){

    this.ontimizeServiceUsers.query({id_client: this.id_client}, ['id_activity', 'activity_name'], 'activity_client').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.arrayActivitiesClient = [];
          res.data.forEach(element => {
            this.arrayActivitiesClient.push(element.activity_name);
          });
        }
      }      
    );
  }

  closeDialog(){
    this.dialog.closeAll()
  }
}
