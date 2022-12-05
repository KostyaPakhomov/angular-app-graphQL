import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageShowComponent } from 'Core/base/page-show.component';
import { Location } from '@angular/common';
import { CharactersService } from 'Core/services';
import { Character, CharactersResponse } from 'Core/models';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  providers: [CharactersService],

  styleUrls: ['./character-page.component.scss'],
})
export class CharacterPageComponent
  extends PageShowComponent<CharactersResponse, Character>
  implements OnInit
{
  constructor(
    protected override dataService: CharactersService,
    protected override cdRef: ChangeDetectorRef,
    protected override router: Router,
    protected override route: ActivatedRoute,
    protected override elRef: ElementRef,
    protected override location: Location
  ) {
    super(dataService, route, router, elRef, cdRef, location);
  }
  override ngOnInit(): void {
    super.ngOnInit();
  }
}
