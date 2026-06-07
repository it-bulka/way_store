import { Helmet } from 'react-helmet-async'

interface PageMetaProps {
  title: string
  description?: string
  ogImage?: string
  noindex?: boolean
}

export const PageMeta = ({ title, description, ogImage, noindex }: PageMetaProps) => (
  <Helmet>
    <title>{title} | Way</title>
    {description && <meta name="description" content={description} />}
    {noindex && <meta name="robots" content="noindex, nofollow" />}
    <meta property="og:site_name" content="Way" />
    <meta property="og:title" content={`${title} | Way`} />
    {description && <meta property="og:description" content={description} />}
    <meta property="og:type" content={ogImage ? 'product' : 'website'} />
    {ogImage && <meta property="og:image" content={ogImage} />}
  </Helmet>
)
