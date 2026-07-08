import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import category from './category'
import testimonial from './testimonial'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, testimonial, order],
}

export const schemaTypes = [product, category, testimonial, order]
