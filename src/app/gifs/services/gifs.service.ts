import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif, Images } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(
    private http: HttpClient
  ) {

    // en caso de que devuelva null le ponemos un arreglo vacio 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // if (localStorage.getItem('historial')) {
    //   devolvemos el dato a su anterior estado para poder utilizarlo con JSON.parse
    //   el signo ! sirve para indicarle que de omita los errores Nosotros sabemos lo que estamos haciendo
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  private apiKey: string = 'V6Nf3g14xigm6chFzNSl8zCWopuniULL';

  private servicioUrl: string = 'https://api.giphy.com/v1/stickers';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {

    // romper la referencia con el operador spread en caso de ser modificado devolver el valor
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 15);

      // almacena los datos de busqueda en localStorage con JSON.stringify
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    // obtenemos los parametros 
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '15')
      .set('q', query);


    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;

        localStorage.setItem('resultados', JSON.stringify(this.resultados));

      });

  }
}
