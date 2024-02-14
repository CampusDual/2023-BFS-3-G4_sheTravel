import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService, OFormComponent, OSnackBarConfig, OTranslateService, OntimizeService, SnackBarService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('formregister', { static: true }) formregister: OFormComponent;
  public name;
  public surname;
  public regemail;
  public password;
  public invalid = false;

  validatorsArray: ValidatorFn[] = []; // Array de validadores personalizados
  isPasswordModified: boolean = false; // Indicador de si la contraseña ha sido modificada
  form: FormGroup;

  constructor(
    public router: Router,
    @Inject(NavigationService) public navigation: NavigationService,
    private fb: FormBuilder,
    private ontimizeServiceRegister: OntimizeService,
    private snackBarService: SnackBarService,
    private translate: OTranslateService
  ) {
    this.ontimizeServiceRegister.configureService(this.ontimizeServiceRegister.getDefaultServiceConfiguration('register'));
    this.validatorsArray.push(this.passwordValidator); // Añadir el validador de contraseña al array
    this.router = router;
  }


  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      user_: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordMatchValidator]],
      passwordConfirm: ['', [Validators.required, this.passwordMatchValidator]]
    });
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

  saveUserInDataBase() {
    this.formregister.insert();
  }

  userCreated() {
    const config: OSnackBarConfig = {
      action: 'OK',
      milliseconds: 5000,
      icon: 'check_circle_outline',
      iconPosition: 'left'
    };
    this.snackBarService.open(this.translate.get('SNACKREGISTER'), config);
    this.router.navigate(["/login"]);
  }

}
