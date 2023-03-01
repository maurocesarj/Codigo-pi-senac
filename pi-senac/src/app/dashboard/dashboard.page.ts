import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';

import { DadosContatosService } from 'src/app/services/dados-contatos.service';
import { Pessoa } from 'src/app/models/pessoa.model'
import { Guid } from 'guid-typescript';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private pessoa: Pessoa 
  public pessoaForm: FormGroup
  private arrayPessoa: Pessoa[] = []
  public dadosContatos : any

  constructor(public authService: AuthenticationService,
    private objContatos : DadosContatosService,
    private FormBuilder : FormBuilder,
    private pessoaService : DadosContatosService) {
      this.dadosContatos = objContatos.enviarContatos()
    }

    ngOnInit(){

      this.arrayPessoa = this.objContatos.getItems()
     
      this.pessoa = {id: Guid.createEmpty(), marca: "", nome: "", cor: "", tamanho: "", preco:"", quantidade:"",}
   
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
     }

     enviar(){
      if (this.pessoaForm.valid){
        this.pessoaService.inserir(this.pessoaForm.value)
      }
    }

// Calculo total da compra

    Total: Number

    calcularTotal(item:Pessoa) {
      const valor1 = parseFloat(item.preco)
      const valor2 = parseFloat(item.quantidade)
   
      this.Total = valor1 * valor2
    }
  }