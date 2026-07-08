import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Orders')
        .schemaType('order')
        .child(S.documentTypeList('order').title('Orders')),
      S.listItem()
        .title('Testimonials')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Testimonials')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['product', 'category', 'order', 'testimonial'].includes(item.getId() || '')
      ),
    ])
