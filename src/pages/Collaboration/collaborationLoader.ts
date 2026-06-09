import { type LoaderFunctionArgs } from 'react-router-dom'
import { collabs } from '@/data/collabs'

export const collaborationLoader = ({ params }: LoaderFunctionArgs) =>
  collabs.find(c => c.id === params.slug) ?? null
