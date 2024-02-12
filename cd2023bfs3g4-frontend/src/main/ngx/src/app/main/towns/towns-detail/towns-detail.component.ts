import { Component, OnInit, ViewChild } from '@angular/core';
import { Expression, FilterExpressionUtils, OFormComponent, OTextInputComponent, OntimizeService } from 'ontimize-web-ngx';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-towns-detail',
  templateUrl: './towns-detail.component.html',
  styleUrls: ['./towns-detail.component.css']
})
export class TownsDetailComponent implements OnInit {

  @ViewChild('townnamefield', { static: true }) townnamefield: OTextInputComponent;
  @ViewChild('form',{static:true}) form:OFormComponent;
  public idcommunity;
  public custom_name: string;
  

  constructor(private router: Router,
    private ontimizeServiceUsers: OntimizeService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  splitActivities(activities){
    if (activities && typeof activities === 'string') {
      const arrayActivities = activities.split(',');
      
      return arrayActivities;
    } else {
      return [];
    }
  }

// Método para el filtrado del o-filter 
createFilter(values: Array<{ attr: string, value: any }>): Expression {
  const filters: Expression[] = [];
  values.forEach(fil => {
    if (fil.value !== undefined && fil.value !== null) {
      if (fil.attr === 'name' || fil.attr === 'surname') {
        filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, fil.value));
      }
      if (fil.attr === 'activities' ) {
        filters.push(FilterExpressionUtils.buildExpressionLike('activities', fil.value));
      }
    }
  });

  if (filters.length > 0) {
    return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
  } else {
    return null;
  }

}


  // loadActivities(idclient) {
  //   console.log(idclient);
  //   this.ontimizeServiceUsers.query({ id_client: idclient }, ['id_activity', 'activity_name'], 'activity_client').subscribe(
  //     res => {
  //       if (res.data && res.data.length) {
  //         this.arrayActivitiesClient [idclient] = [];
  //         res.data.forEach(element => {
  //           this.arrayActivitiesClient[idclient].push(element.activity_name);
  //         });
  //       }
  //     }
  //   );
  // }

  loadName() {
    this.custom_name = this.townnamefield.getValue();

  }

  reloadValues(event) {
    if (event.newValue) {
      this.custom_name = event.newValue.value;
    }
  }

  goToHostDetail(event) { 
    const obj = event;
    type ObjectKey = keyof typeof obj;
    const myVar = 'id_client' as ObjectKey;
    var id_client = obj[myVar];
    this.router.navigate(["main/travelers", id_client]);
  }

  onLoad(){
    this.idcommunity = this.form.getComponents().id_community.getValue();
  }


}
