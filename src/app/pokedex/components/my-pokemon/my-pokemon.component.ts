import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonBasic } from '../../../services/constants/constants';
import { PokedexService } from '../../../services/pokedex-service/pokedex.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'nga-my-pokemon',
	templateUrl: './my-pokemon.html',
	styleUrls: ['./my-pokemon.scss'],
})

export class MyPokemonComponent implements OnInit, OnDestroy{
	constructor(
		private pokeService: PokedexService,
		private router: Router,
	) { }

	subscription: Subscription;

	loading = true;

	offset:number = 0;;
	limit:number = 10;
	size: number = 1;

	private myPokemonList: PokemonBasic[] = [];

	private pokemonDetails: Object[];
	
	myPokemon= [];

	ngOnInit() {
		this.getMyPokemon();
	}

	getMyPokemon() {
		this.myPokemon = this.pokeService.getMyPokemon();
		for(let pokemon of this.myPokemon) {
			this.subscription = this.pokeService.getSinglePokemon(pokemon.name)
				.subscribe(
					response =>  {
						this.loading = false;
						let pokemon = new PokemonBasic(response.name, response.url, response.id, response.sprites.front_default);
						this.myPokemonList.push(pokemon);
					}
				)
		}
	}
		
	onViewSingle(id) {
		this.router.navigate([`/pokedex/${id}/details`]);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
	
}
