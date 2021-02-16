import { EntityRepository, Repository } from 'typeorm'
import { Bundle } from './entities/bundle.entity'

@EntityRepository()
export class BundleRepository extends Repository<Bundle> {}
