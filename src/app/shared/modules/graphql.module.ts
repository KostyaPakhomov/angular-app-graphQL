import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { NgModule } from '@angular/core';
import { environment } from 'Env';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.uri,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
