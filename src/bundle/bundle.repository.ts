import {
  EntityRepository,
  getConnection,
  Repository,
  UpdateResult,
} from 'typeorm'
import { Bundle } from './entities/bundle.entity'
import { Card } from './entities/card.entity'

interface UpdateBundle extends Omit<Partial<Bundle> & { id: number }, 'cards'> {
  cards: Partial<Card>[]
}

@EntityRepository(Bundle)
export class BundleRepository extends Repository<Bundle> {
  /**
   *
   * @deprecated use updateBundle() instead
   */
  async update(): Promise<UpdateResult> {
    throw new Error('deprecated method, use updateBundle() instead.')
  }

  async updateBundle(updateBundle: UpdateBundle) {
    return await getConnection().transaction(async (manager) => {
      updateBundle.cards.map((c) => (c.bundleId = updateBundle.id))
      const deleteQueryResult = await manager
        .createQueryBuilder()
        .delete()
        .from(Card)
        .where({ bundleId: updateBundle.id })
        .andWhere('id NOT IN (:...cards)', {
          cards: updateBundle.cards
            .filter((c) => typeof c.id === 'number' && !isNaN(c.id))
            .map((c) => c.id),
        })
        .execute()

      const updateOrInsertQueryResult = await manager
        .createQueryBuilder()
        .insert()
        .into(Card, ['id', 'bundleId', 'front', 'back'])
        .values(updateBundle.cards)
        .onConflict(
          '("id") DO UPDATE SET front=excluded.front, back=excluded.back',
        )
        .returning('*')
        .execute()

      return updateOrInsertQueryResult.raw as Bundle
    })
  }
}
