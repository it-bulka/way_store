import { type LoaderFunctionArgs } from 'react-router-dom'
import { collections } from '@/data/collections'

export const collectionLoader = ({ params }: LoaderFunctionArgs) =>
  collections.find(c => c.id === params.slug) ?? null
