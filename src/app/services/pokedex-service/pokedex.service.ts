import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BASE_URL } from '../../../environments/environment';
import { FormBuilder } from '@angular/forms';

@Injectable()
export class PokedexService {

	constructor(
		private http: Http,
        private router: Router
	) { }

    //Get Pokemon list
    getAllPokemon(offset:number, limit:number) {
        return this.http.get(`${BASE_URL}pokemon/?offset=${offset}&limit=${limit}`)
			.map(res => (<Response>res).json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});
    }

    //Get Pokemon details
    getSinglePokemon(name) {
        return this.http.get(`${BASE_URL}pokemon/${name}`)
			.map(res => (<Response>res).json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});
    }

    //Add to my Pokemon
    addToMyPokemon(name, imageUrl, types) {
        let pokemon = {
            'name': name,
            'image': imageUrl,
            'types': types
        }
        let a = [];
        if(localStorage.getItem('my-pokemon') === null) {
            localStorage.setItem('my-pokemon', JSON.stringify(a));
            this.addToLocalStorage(pokemon);
        } else
            this.addToLocalStorage(pokemon);
    } 

    removeFromMyPokemon(name) {
        let my_pokemon = JSON.parse(localStorage.getItem('my-pokemon'));
        for(var i = my_pokemon.length - 1; i >= 0; i--) {
            if(my_pokemon[i].name === name) {
               my_pokemon.splice(i, 1);
            }
        }
        localStorage.setItem('my-pokemon', JSON.stringify(my_pokemon));
    }

    addToLocalStorage(pokemon) {
        let my_pokemon = JSON.parse(localStorage.getItem('my-pokemon'));
        my_pokemon.push(pokemon);
        localStorage.setItem('my-pokemon', JSON.stringify(my_pokemon));
    }

    //Get my Pokemon

    getMyPokemon() {
        let myPokemon: Object[] =  JSON.parse(localStorage.getItem('my-pokemon'));
        return myPokemon;
    }

	//Error function
	_handleError(error) {
		console.log(error);
	}
}
