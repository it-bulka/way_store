import { useRouteError } from 'react-router-dom'

export const GoodsError = () => {
  const error = useRouteError() as Error
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Не вдалося завантажити товар.</p>
      {import.meta.env.DEV && (
        <pre style={{ textAlign: 'left', fontSize: '0.8rem', marginTop: '1rem' }}>
          {error?.message}
        </pre>
      )}
    </div>
  )
}
