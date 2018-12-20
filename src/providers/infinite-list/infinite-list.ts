import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class InfiniteListProvider {

  perpage:number = 5;
  // perpage:number = 0;

  listObject: any;
  listDatas: any = [];

  constructor(public http: HttpClient) {
    console.log('Hello InfiniteListProvider Provider');

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization' : 'Bearer cr9qu3Ju7Vo7',
    //     'Content-Type': 'application/json',
    //     'access_token' : 'cr9qu3Ju7Vo7',
    //     'client_id' : 'kjiLnbesiMMD'
    //   })
    // };

    // // const apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/1/transacoes?limit=30';
    // // const apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/1/transacoes';
    // const apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/1/transacoes=';

    // this.http.get(apiUrlForListing, httpOptions).subscribe(result => {
    //   this.listObject = result;
    //   this.listDatas = this.listObject.content;
    //   console.log(this.listDatas);
    // });
  }

  load(start:number=0) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer cr9qu3Ju7Vo7',
        'Content-Type': 'application/json',
        'access_token' : 'cr9qu3Ju7Vo7',
        'client_id' : 'kjiLnbesiMMD'
      })
    };

    const apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/1/transacoes?limit=';
    
    return new Promise(resolve => {
        this.http.get(apiUrlForListing+this.perpage, httpOptions)
            .subscribe(data => {

              resolve(data);

          });
    });
  }

  // getData(): any[] {
  //   // return mock data synchronously
  //   // let data: any[] = [];

  //   for (var i = 0; i < 30; i++) {
  //     this.listDatas.push( this._getRandomData() );
  //   }
  //   return this.listDatas;

  //   // return null;
  // }

  // getAsyncData(): Promise<any[]> {
  //   // async receive mock data
  //   return new Promise(resolve => {

  //     setTimeout(() => {
  //       resolve(this.getData());
  //     }, 500);

  //   });
  // }

  // private _getRandomData() {
  //   let i = Math.floor( Math.random() * this.listDatas.length );
  //   return this.listDatas[i];
  // }

  // private _data = [
  //   "idTipoTransacaoNaoProcessada",
  //   "descricaoTipoTransacaoNaoProcessada",
  //   "idEventoAjuste",
  //   "descricaoAbreviada",
  //   "idConta",
  //   "cartaoMascarado",
  //   "nomePortador",
  //   "dataOrigem",
  //   "dataFaturamento",
  //   "dataVencimentoReal",
  //   "modoEntradaTransacao",
  //   "taxaEmbarque",
  //   "valorEntrada",
  //   "valorBRL",
  //   "valorUSD",
  //   "cotacaoUSD",
  //   "dataCotacaoUSD",
  //   "codigoMoedaOrigem",
  //   "codigoMoedaDestino",
  //   "codigoAutorizacao",
  //   "codigoReferencia",
  //   "codigoTerminal",
  //   "codigoMCC",
  //   "grupoMCC",
  //   "grupoDescricaoMCC",
  //   "idEstabelecimento",
  //   "nomeEstabelecimento",
  //   "nomeFantasiaEstabelecimento",
  //   "localidadeEstabelecimento",
  //   "plano",
  //   "parcela",
  //   "flagCredito",
  //   "flagFaturado",
  //   "idTransacaoEstorno",
  //   "status",
  // ];

}
