import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    private gifsService: GifsService
  ) { }

  get historial() {
    return this.gifsService.historial;
  }

  // mandamos a llamar la busqueda ya realizada pasandole el termino en este caso dando click en el html obteniendo asi el termino
  buscar(termino: string) {
    this.gifsService.buscarGifs(termino)
  }

}
