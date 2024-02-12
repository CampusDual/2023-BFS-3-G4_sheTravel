import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Expression, FilterExpressionUtils, OTextInputComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-community-detail',
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.css']
})
export class CommunityDetailComponent implements OnInit {

  @ViewChild('communitynamefield', { static: true }) communitynamefield: OTextInputComponent;

  idCommunity: number;
  public custom_name: string;

  constructor(private ontimizeServiceUsers: OntimizeService,
    private route: ActivatedRoute) { 
    this.ontimizeServiceUsers.configureService(this.ontimizeServiceUsers.getDefaultServiceConfiguration('users'));
  }

  ngOnInit() {
     // Obtener la id_community de los parámetros de la ruta
     this.route.params.subscribe((params) => {
      this.idCommunity = +params['id_community'];
      console.log(this.idCommunity);
    });
  }

  // Título de la página
  loadName() {
    this.custom_name = this.communitynamefield.getValue();

  }

  reloadValues(event) {
    if (event.newValue) {
      this.custom_name = event.newValue.value;
    }
  }

  // Método para el filtrado del o-filter 
  createFilter(values: Array<{ attr: string, value: any }>): Expression {
    const filters: Expression[] = [];
    values.forEach(fil => {
      if (fil.value !== undefined && fil.value !== null) {
        // Usar 'like' para campos de texto que puedan contener parte del texto buscado
        if (fil.attr === 'province_name' || fil.attr === 'town_name') {
          filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, fil.value));
        }
      }
    });

    // Filtro adicional para que solo muestre ciudades/provincias de id_community seleccionado
    if (this.idCommunity) {
      filters.push(FilterExpressionUtils.buildExpressionEquals('id_community', this.idCommunity));
    }

    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(
        exp1, exp2, FilterExpressionUtils.OP_AND)
      );
    } else {
      return null;
    }

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

  getHostNumber (){
    // this.ontimizeServiceUsers.query({"id_town": idtown}, ['id_activity', 'activity_name'], 'activity_client').subscribe(
      console.log("Hola");
  }

}
