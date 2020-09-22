import { FavoriteService } from 'src/app/core/favorite.service';

export abstract class BaseComponent<T> {
  constructor(protected favorites: FavoriteService) {
  }
}
