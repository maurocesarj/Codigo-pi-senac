import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private alertController: AlertController
  ) {}
  

  ngOnInit() {}

  signUp(email, password) {
    this.authService
      .RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
        this.authService.SendVerificationMail();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Um email de verificação foi enviado para seu Email.',
      message: 'Faça Login após verificar.',
      buttons: ['OK'],
      cssClass: 'button-blue',
    });

    await alert.present();
  }

}

