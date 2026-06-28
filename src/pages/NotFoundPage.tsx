/**
 * 404 页面
 */
import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/layout/Eyebrow'
import { useI18n } from '../lib/i18n'

export function NotFoundPage() {
  const { t } = useI18n()
  return (
    <div className="container-page py-4xl">
      <Eyebrow className="mb-md">{t('notFound.eyebrow')}</Eyebrow>
      <h1 className="text-display-md tracking-display text-ink">{t('notFound.title')}</h1>
      <p className="mt-md text-body-md text-body">{t('notFound.desc')}</p>
      <div className="mt-xl flex gap-sm">
        <Link to="/" className="btn-primary">
          {t('notFound.backHome')}
        </Link>
        <Link to="/modules" className="btn-pill">
          {t('notFound.browseModules')}
        </Link>
      </div>
    </div>
  )
}
