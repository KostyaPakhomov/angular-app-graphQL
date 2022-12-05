import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PageIndexComponent } from 'Core/base/page-index.component';
import { Character, CharactersResponse } from 'Core/models';
import { CharactersService, HandlerErrorService } from 'Core/services';

@UntilDestroy()
@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  providers: [CharactersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersListComponent
  extends PageIndexComponent<CharactersResponse, Character>
  implements OnInit
{
  activeItemIndex = 0;
  override hasPagination = true;
  header = 'All the Rick and Morty information';
  constructor(
    protected override dataService: CharactersService,
    protected override cdRef: ChangeDetectorRef,
    protected override router: Router,
    protected override route: ActivatedRoute,
    protected override error: HandlerErrorService
  ) {
    super(dataService, route, router, cdRef, error);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.search();
    this.cdRef.detectChanges();
  }
}
