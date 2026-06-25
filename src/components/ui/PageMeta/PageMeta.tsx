import { Helmet } from 'react-helmet-async'

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://way-store.netlify.app'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

interface PageMetaProps {
  title: string
  description?: string
  ogImage?: string
  noindex?: boolean
}

export const PageMeta = ({ title, description, ogImage, noindex }: PageMetaProps) => {
  const image = ogImage ?? DEFAULT_OG_IMAGE
  const url = typeof window !== 'undefined' ? window.location.href : SITE_URL

  return (
    <Helmet>
      <title>{title} | Way</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content="Way" />
      <meta property="og:type" content={ogImage ? 'product' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={`${title} | Way`} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Way`} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
