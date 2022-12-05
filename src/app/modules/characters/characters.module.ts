import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { SharedModule } from 'Shared/shared.module';
import { CharacterPageComponent } from './character-page/character-page.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';

@NgModule({
  declarations: [
    CharactersComponent,
    CharactersListComponent,
    CharacterPageComponent,
  ],
  imports: [CommonModule, CharactersRoutingModule, SharedModule, ApolloModule],
  providers: [],
})
export class ProductsModule {}
