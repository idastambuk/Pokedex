import { Component, OnInit, OnChanges } from '@angular/core';
import { PokedexService } from '../../../services/pokedex-service/pokedex.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'nga-pokemon-details',
	templateUrl: './pokemon-details.html',
	styleUrls: ['./pokemon-details.scss'],
})

export class PokemonDetailsComponent implements OnInit{
	constructor(
		private pokeService: PokedexService,
		private route: ActivatedRoute
	) { }

	id;

	loading:boolean = true;

	pokemon = {};

	pokemonAdded:Boolean = false;

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.id = params['id'];
		});
		this.getDetails();
	}

	ngAfterViewChecked(){
		if(this.pokemonAdded === true) {
			document.getElementById('add').innerHTML = "x";
		}
	}

	getDetails() {
		this.pokeService.getSinglePokemon(this.id)
			.subscribe(
				response => {
					this.loading = false;
					this.pokemon = response;
					this.checkIfMyPokemon(response.name);
				}
			)
	}

	onExpandMoves() {
		document.querySelector('.moves').classList.toggle('expanded');
	}

	addToMyPokemon(name, imgUrl, types) {
		this.checkIfMyPokemon(name);
		if(this.pokemonAdded === false) {
			this.pokeService.addToMyPokemon(name, imgUrl, types);
			document.getElementById('add').innerHTML = "x";
			this.pokemonAdded = true;
		} else {
			this.pokeService.removeFromMyPokemon(name);
			document.getElementById('add').innerHTML = "+";
			this.pokemonAdded = false;
		}
	}

	checkIfMyPokemon(name) {
		let my_pokemon = JSON.parse(localStorage.getItem('my-pokemon'));
		for(let p of my_pokemon) {
			if(p.name === name) {
				this.pokemonAdded = true;
			}
		}
	}
}
