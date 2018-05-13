import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokedexService } from '../../../services/pokedex-service/pokedex.service';
import { PokemonBasic } from '../../../services/constants/constants';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'nga-list-pokemon',
	templateUrl: './list-pokemon.html',
	styleUrls: ['./list-pokemon.scss'],
})

export class ListPokemonComponent implements OnInit, OnDestroy{
	constructor(
		private pokeService: PokedexService,
		private router: Router
	) { }

	subscription: Subscription;

	loading:boolean = true;

	offset:number = 0;;
	limit:number = 10;
	size: number = 1;

	pokemonList: PokemonBasic[] = [];

	pokemonDetails: Object[];
	
	pokemon = {};

	ngOnInit() {
		this.getAllPokemon();
	}

	getAllPokemon() {
		this.pokemonList = [];
		this.subscription = this.pokeService.getAllPokemon(this.offset, this.limit)
			.subscribe(
				response =>  {
					this.size = response.count;
					this.loading = false;			
					for(let i of response.results) {
						this.pokeService.getSinglePokemon(i.name)
						.subscribe(
							response =>  {
								let pokemon = new PokemonBasic(response.name, response.url, response.id, response.sprites.front_default);
								this.pokemonList.push(pokemon);
							}
						);
					}
				}
			)
	}
	getSinglePokemon(name) {
		this.pokeService.getSinglePokemon(name)
			.subscribe(
				response =>  {
					this.pokemon = response;
				}
			)
	}

	onViewSingle(id) {
		this.router.navigate([`/pokedex/${id}/details`]);
	}

	onPageChange(offset) {
		this.offset = offset;
		this.getAllPokemon();
	}
	
	ngOnDestroy() {
	this.subscription.unsubscribe();
	}
}
