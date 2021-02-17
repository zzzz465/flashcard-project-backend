import { EntityRepository, Repository } from 'typeorm'
import { Bundle } from './entities/bundle.entity'

@EntityRepository(Bundle)
export class BundleRepository extends Repository<Bundle> {}
