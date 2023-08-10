import { Component, Input } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interface/gifs.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  @Input()
  public gif:Gif[]=[]
  
  constructor(
    private gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

  get resultados() {
    return this.gifsService.resultados;
  }


}
