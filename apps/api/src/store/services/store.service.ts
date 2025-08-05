import { Inject } from '@nestjs/common'

import { StoreLoader } from '../data-loaders/store.loader'
import { StoresByHomeLoader } from '../data-loaders/stores-by-home.loader'

export class StoreService {
  @Inject(StoreLoader)
  private readonly stores!: StoreLoader

  @Inject(StoresByHomeLoader)
  private readonly byHome!: StoresByHomeLoader

  async getById(store: string) {
    return this.stores.load(store)
  }

  async getByHomeId(home: string) {
    const stores = await this.byHome.load(home)
    for (const store of stores) {
      this.stores.prime(store.id, store)
    }

    return stores
  }
}
