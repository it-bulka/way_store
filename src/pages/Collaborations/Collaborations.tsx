import cls from './Collaborations.module.scss'
import { PageNav } from '@/components/ui/PageNav/PageNav'
import { Typography } from '@/components/ui/Typography/Typography'
import { collabs } from '@/data/collabs'
import { CollabCard } from '@/components/ui/CollabCard/CollabCard'

const options = ['Главная', 'Коллаборации']

export const Collaborations = () => {
  return (
    <div className={cls.collaborations}>
      <PageNav options={options} />
      <Typography className={cls.title}>КОЛЛАБОРАЦИИ</Typography>
      {collabs?.map(({ id, title, content, src }) => (
        <CollabCard img={src} title={title} content={content} key={id} />
      ))}
    </div>
  )
}
