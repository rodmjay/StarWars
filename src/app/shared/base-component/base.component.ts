import { FavoriteService } from 'src/app/favorites/favorite.service';

export abstract class BaseComponent<T> {
  constructor(protected favorites: FavoriteService) {
  }
}
