import { Component, OnInit, ViewChild } from '@angular/core';
import { Expression, FilterExpressionUtils, OComboComponent, OFilterBuilderComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-towns-home',
  templateUrl: './towns-home.component.html',
  styleUrls: ['./towns-home.component.css']
})
export class TownsHomeComponent implements OnInit {

  @ViewChild('filterBuilder', { static: true }) filterBuilder: OFilterBuilderComponent;


  constructor(private ontimizeServiceTowns: OntimizeService) { 
    this.ontimizeServiceTowns.configureService(this.ontimizeServiceTowns.getDefaultServiceConfiguration('towns'))
  }

  ngOnInit() {
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

    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
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

}
