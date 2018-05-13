import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { routing } from './pokedex.routing';
import { ListPokemonComponent } from './components/list-pokemon';
import { PokemonDetailsComponent } from './components/pokemon-details';
import { MyPokemonComponent } from './components/my-pokemon/my-pokemon.component';
import { PokedexComponent } from '.';
import { PokedexService } from '../services/pokedex-service/pokedex.service';
import { PaginationComponent } from '../pagination/pagination.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		routing,
	],
	declarations: [
		PokedexComponent,
		ListPokemonComponent,
		PokemonDetailsComponent,
		MyPokemonComponent,
		PaginationComponent
	],
	providers: [
		PokedexService]
})
export class PokedexModule {}
