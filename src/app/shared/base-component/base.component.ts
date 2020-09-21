import { FavoriteService } from 'src/app/features/favorites/favorite.service';

export abstract class BaseComponent<T> {
  constructor(protected favorites: FavoriteService) {
  }
}
