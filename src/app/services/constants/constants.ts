export class PokemonBasic {
    name;
    url;
    id;
    imgUrl;

    constructor(name: String, url: Number, id: number, imgUrl: string) {
      this.name = name;
      this.url = url;
      this.id = id;
      this.imgUrl = imgUrl
    }
}