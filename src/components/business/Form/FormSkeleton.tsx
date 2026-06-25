import { type FC } from 'react'
import cls from './FormSkeleton.module.scss'

const InputSkeleton = () => <div className={cls.input} />

const SectionSkeleton: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={cls.section}>{children}</div>
)

export const FormSkeleton: FC = () => (
  <div className={cls.skeleton}>
    <div className={cls.col}>
      <SectionSkeleton>
        <div className={cls.sectionTitle} />
        <div className={cls.radioRow}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={cls.radio} />
          ))}
        </div>
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
        <div className={cls.birthdayBlock}>
          <div className={cls.sectionTitle} />
          <div className={cls.selectRow}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className={cls.select} />
            ))}
          </div>
        </div>
        <div className={cls.btn} />
      </SectionSkeleton>

      <SectionSkeleton>
        <div className={cls.sectionTitle} />
        <div className={cls.textLine} />
      </SectionSkeleton>
    </div>

    <div className={cls.divider} />

    <SectionSkeleton>
      <div className={cls.sectionTitle} />
      <InputSkeleton />
      <div className={cls.addressRow}>
        <div className={cls.addressWide} />
        <div className={cls.addressNarrow} />
      </div>
      <div className={cls.addressRow}>
        <div className={cls.addressNarrow} />
        <div className={cls.addressNarrow} />
        <div className={cls.addressNarrow} />
      </div>
      <div className={cls.addressRow}>
        <div className={cls.addressNarrow} />
        <div className={cls.addressNarrow} />
      </div>
      <div className={cls.textarea} />
      <div className={cls.btn} />
    </SectionSkeleton>
  </div>
)
