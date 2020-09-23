import { FavoriteService } from 'src/app/core/services/favorite.service';

export abstract class BaseComponent<T> {
  constructor(protected favorites: FavoriteService) {
  }
}
