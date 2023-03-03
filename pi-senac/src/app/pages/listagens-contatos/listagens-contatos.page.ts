import { Component, OnInit } from '@angular/core';
import { DadosContatosService } from 'src/app/services/dados-contatos.service';
import { Pessoa } from 'src/app/models/pessoa.model';
import { Guid } from 'guid-typescript';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { User } from 'src/app/shared/user';
import { Router } from '@angular/router';

import { GoogleAuthProvider, ProviderId} from 'firebase/auth';


@Component({
  selector: 'app-listagens-contatos',
  templateUrl: './listagens-contatos.page.html',
  styleUrls: ['./listagens-contatos.page.scss'],
})
export class ListagensContatosPage implements OnInit {
  private pessoa: Pessoa 
  public pessoaForm: FormGroup
  public arrayPessoa: any
  public dadosContatos : any
  public arrayGoogle: any
  public user : User
  public userPhotoUrl: string;


  constructor(
    private objContatos : DadosContatosService,
    private FormBuilder : FormBuilder,
    private pessoaService : DadosContatosService,
    private googleService : AuthenticationService,
    private router: Router) {
    this.dadosContatos = objContatos.enviarContatos()
   }

   ngOnInit(){
    this.pessoa = {id: Guid.createEmpty(), marca: "", nome: "", cor: "", tamanho: "", preco:"", quantidade:""}
 
    this.pessoaForm = this.FormBuilder.group
    ({
      id: [this.pessoa.id],
      marca: [this.pessoa.marca, Validators.required],
      nome: [this.pessoa.nome, Validators.required],
      cor: [this.pessoa.cor, Validators.required],
      tamanho: [this.pessoa.tamanho, Validators.required],
      preco: [this.pessoa.preco, Validators.required],
      quantidade: [this.pessoa.quantidade, Validators.required],

    })
    
    this.pessoaService.listarTodos().then(arrayPessoa => {this.arrayPessoa = arrayPessoa})

    // this.googleService.AuthLogin(GoogleAuthProvider).then(arrayGoogle => {this.arrayGoogle1 = arrayGoogle})

    this.arrayGoogle = this.googleService.userData

    console.log(this.arrayGoogle.photoURL)
   }

   
 
   enviar(){
     if (this.pessoaForm.valid){
       this.pessoaService.inserir(this.pessoaForm.value)
     }
   }

   recarregarPagina() {
    this.router.navigateByUrl('/MinhaPagina', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURIComponent(this.router.url)]);
    });
  }

}
