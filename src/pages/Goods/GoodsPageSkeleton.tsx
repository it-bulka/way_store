import { type FC } from 'react'
import cls from './GoodsPageSkeleton.module.scss'

const AccordionSkeleton = () => (
  <div className={cls.accordion}>
    {Array.from({ length: 4 }, (_, i) => (
      <div key={i} className={cls.accordionItem}>
        <div className={cls.accordionTitle} />
        <div className={cls.accordionIcon} />
      </div>
    ))}
  </div>
)

export const GoodsPageSkeleton: FC = () => (
  <div className={cls.skeleton}>
    <div className={cls.breadcrumbs}>
      <div className={cls.crumb} />
      <div className={cls.crumbSep} />
      <div className={cls.crumb} />
      <div className={cls.crumbSep} />
      <div className={cls.crumbLast} />
    </div>

    <div className={cls.title}>
      <div className={cls.titleText} />
      <div className={cls.titleNav} />
    </div>

    <div className={cls.content}>
      <div className={cls.col1}>
        <div className={cls.viewer} />
        <div className={cls.thumbs}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={cls.thumb} />
          ))}
        </div>
      </div>
      <div className={cls.col2}>
        <div className={cls.descriptRow}>
          <div className={cls.name} />
          <div className={cls.likeBtn} />
        </div>

        <div className={cls.price} />

        <div className={cls.controls}>
          <div className={cls.stepperBlock}>
            <div className={cls.stepperLabel} />
            <div className={cls.stepperInput} />
          </div>
          <div className={cls.btnsBlock}>
            <div className={cls.btn} />
            <div className={cls.btn} />
          </div>
        </div>

        <div className={cls.colorSection}>
          <div className={cls.colorLabel} />
          <div className={cls.colorRow}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className={cls.colorDot} />
            ))}
          </div>
        </div>

        <div className={cls.sizeSection}>
          <div className={cls.sizeLabel} />
          <div className={cls.sizeRow}>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className={cls.sizeBtn} />
            ))}
          </div>
        </div>

        <div className={cls.desktopAccordion}>
          <AccordionSkeleton />
        </div>
      </div>
    </div>

    <div className={cls.mobileAccordion}>
      <AccordionSkeleton />
    </div>
  </div>
)
