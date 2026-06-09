import cls from './Collaborations.module.scss'
import { PageNav } from '@/components/ui/PageNav/PageNav'
import { Typography } from '@/components/ui/Typography/Typography'
import { collabs } from '@/data/collabs'
import { CollabCard } from '@/components/ui/CollabCard/CollabCard'
import { Layout } from '@/components/business/Layout/Layout'
import { Outlet, useParams } from 'react-router-dom'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const options = [
  { id: '1', title: 'Головна', path: '/' },
  { id: '2', title: 'Колаборації', path: '/collaborations' },
]

export const Collaborations = () => {
  const { slug } = useParams()

  if (slug) {
    return <Outlet />
  }

  return (
    <Layout>
      <PageMeta title="Колаборації" />
      <div className={cls.collaborations}>
        <PageNav options={options} />
        <Typography className={cls.title}>КОЛАБОРАЦІЇ</Typography>
        {collabs?.map(({ id, title, content, src }) => (
          <CollabCard img={src} title={title} content={content} key={id} id={id} />
        ))}
      </div>
    </Layout>
  )
}

export default Collaborations
