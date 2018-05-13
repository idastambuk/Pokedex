import { Routes, RouterModule } from '@angular/router';

import { ListPokemonComponent } from './components/list-pokemon';
import { MyPokemonComponent } from './components/my-pokemon/my-pokemon.component';
import { PokedexComponent } from './pokedex.component';
import { PokemonDetailsComponent } from './components/pokemon-details';


const routes: Routes = [
	{
		path: 'pokedex',
		component: PokedexComponent,
		children: [
			{ path: 'list', component: ListPokemonComponent },
			{ path: ':id/details', component: PokemonDetailsComponent },	
			{ path: 'my-pokemon', component: MyPokemonComponent },
		],
	},
];

export const routing = RouterModule.forChild(routes);