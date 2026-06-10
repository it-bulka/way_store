import { type LoaderFunctionArgs } from 'react-router-dom'
import { collectionsBase } from '@/data/collectionsBase'

export const collectionLoader = ({ params }: LoaderFunctionArgs) =>
  collectionsBase.find(c => c.id === params.slug) ?? null
