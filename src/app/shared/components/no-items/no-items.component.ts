import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { HandlerErrorService } from 'Core/services';

@UntilDestroy()
@Component({
  selector: 'app-no-items',
  templateUrl: './no-items.component.html',
  styleUrls: ['./no-items.component.scss']
})
export class NoItemsComponent implements OnInit {
  text = 'Отсутствуют данные или совпадения не найдены'
  constructor(private errorService: HandlerErrorService) { }

  ngOnInit(): void {
    this.errorService.$error.subscribe(res => {
      this.text = res;
    })
  }

}
