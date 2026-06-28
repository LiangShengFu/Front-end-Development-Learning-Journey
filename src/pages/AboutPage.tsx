/**
 * 关于页 - 项目介绍与设计规范说明
 */
import { Eyebrow } from '../components/layout/Eyebrow'
import { Section } from '../components/ui/Section'
import { Callout } from '../components/ui/Callout'
import { useI18n } from '../lib/i18n'

export function AboutPage() {
  const { t } = useI18n()
  const techList = [
    { name: 'React 19', desc: t('about.techReact') },
    { name: 'TypeScript', desc: t('about.techTs') },
    { name: 'Vite', desc: t('about.techVite') },
    { name: 'Tailwind CSS', desc: t('about.techTailwind') },
    { name: 'React Router', desc: t('about.techRouter') },
    { name: 'Vitest + RTL', desc: t('about.techVitest') },
  ]
  const colors = [
    { name: 'Canvas', value: '#0a0a0a', color: 'bg-canvas' },
    { name: 'Card', value: '#191919', color: 'bg-canvas-card' },
    { name: 'Hairline', value: '#212327', color: 'bg-hairline' },
    { name: 'Ink', value: '#ffffff', color: 'bg-ink' },
    { name: 'Sunset', value: '#ff7a17', color: 'bg-accent-sunset' },
    { name: 'Dusk', value: '#7c3aed', color: 'bg-accent-dusk' },
    { name: 'Twilight', value: '#c4b5fd', color: 'bg-accent-twilight' },
    { name: 'Breeze', value: '#a0c3ec', color: 'bg-accent-breeze' },
  ]

  return (
    <>
      <section className="border-b border-hairline py-3xl">
        <div className="container-page">
          <Eyebrow index="ABOUT /" className="mb-md">
            {t('about.eyebrow')}
          </Eyebrow>
          <h1 className="text-display-md tracking-display text-ink">{t('about.title')}</h1>
          <p className="mt-md max-w-2xl text-body-lg text-body">{t('about.desc')}</p>
        </div>
      </section>

      <Section eyebrow={t('about.visionEyebrow')} title={t('about.visionTitle')}>
        <div className="space-y-lg">
          <p className="text-body-md text-body">{t('about.visionDesc1')}</p>
          <p className="text-body-md text-body">{t('about.visionDesc2')}</p>
        </div>
      </Section>

      <Section eyebrow={t('about.techEyebrow')} title={t('about.techTitle')}>
        <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
          {techList.map((tech) => (
            <div key={tech.name} className="rounded-sm border border-hairline bg-canvas-card p-lg">
              <div className="text-body-md text-ink">{tech.name}</div>
              <div className="mt-xs text-body-sm text-body-mid">{tech.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={t('about.designEyebrow')} title={t('about.designTitle')}>
        <div className="space-y-lg">
          <p className="text-body-md text-body">{t('about.designDesc')}</p>
          <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
            {colors.map((c) => (
              <div key={c.name} className="rounded-sm border border-hairline bg-canvas-card p-md">
                <div className={`h-10 w-full rounded-sm ${c.color}`} />
                <div className="mt-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-ink">
                  {c.name}
                </div>
                <div className="font-mono text-caption-mono-sm text-body-mid">{c.value}</div>
              </div>
            ))}
          </div>
          <Callout variant="note" title={t('about.designNoteTitle')}>
            {t('about.designNoteDesc')}
          </Callout>
        </div>
      </Section>
    </>
  )
}
