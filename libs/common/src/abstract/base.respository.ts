import {
  HydratedDocument,
  Model,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  SaveOptions,
} from 'mongoose';

export abstract class BaseRepository<T> {
  constructor(
    protected readonly model: Model<T>,
    // private readonly key: (keyof T)[],
    // protected readonly uow: UnitOfWorkService,
  ) {}

  async findOne(
    filter: QueryFilter<HydratedDocument<T>>,
    projection?: ProjectionType<HydratedDocument<T>>,
  ): Promise<T | null> {
    /*
    const session = await this.uow.getClientSession();
    if (session) {
      return this.model
        .findOne(filter, projection ?? {}, {
          lean: true,
        })
        .session(session);
    }
    */

    return this.model.findOne(filter, projection ?? {}, {
      lean: true,
    });
  }

  async find(
    filterQuery: QueryFilter<HydratedDocument<T>>,
    sortQuery?: QueryOptions<HydratedDocument<T>>,
    limit?: number,
  ): Promise<HydratedDocument<T>[]> {
    const options: {
      lean: boolean;
      sort?: QueryOptions<HydratedDocument<T>>;
      limit?: number;
    } = { lean: true };

    if (sortQuery) {
      options['sort'] = sortQuery;
    }
    if (limit) {
      options['limit'] = limit;
    }

    return this.model.find(filterQuery, {}, options);
  }

  async create(document: T, options?: SaveOptions): Promise<T> {
    const createdDocument = new this.model(document);

    // const session = await this.uow.getClientSession();
    return (
      await createdDocument.save({
        ...options,
        // ...(session && { session }),
      })
    ).toJSON();
  }
}
