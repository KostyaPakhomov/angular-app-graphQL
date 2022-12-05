import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterPageComponent } from './character-page/character-page.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersComponent } from './characters.component';

const routes: Routes = [
  {
    path: '',
    component: CharactersComponent,
    children: [
      { path: '', component: CharactersListComponent },
      {
        path: ':id',
        component: CharacterPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
