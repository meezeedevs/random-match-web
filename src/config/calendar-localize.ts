// require('globalize/lib/cultures/globalize.culture.en-GB')
// require('globalize/lib/cultures/globalize.culture.es')
// require('globalize/lib/cultures/globalize.culture.fr')
// require('globalize/lib/cultures/globalize.culture.ar-AE')

export const cultures:any = ['fr', 'en', 'en-GB', 'es', 'ar-AE']
export const lang: any = {
  en: null,
  'en-GB': null,
  es: {
    week: 'Semana',
    work_week: 'Semana de trabajo',
    day: 'Día',
    month: 'Mes',
    previous: 'Atrás',
    next: 'Después',
    today: 'Hoy',
    agenda: 'El Diario',

    showMore: (total: any) => `+${total} más`,
  },
  fr: {
    week: 'La semaine',
    work_week: 'Semaine de travail',
    day: 'Jour',
    month: 'Mois',
    previous: 'Antérieur',
    next: 'Prochain',
    today: `Aujourd'hui`,
    agenda: 'Ordre du jour',

    showMore: (total: any) => `+${total} plus`,
  },
  'ar-AE': {
    week: 'أسبوع',
    work_week: 'أسبوع العمل',
    day: 'يوم',
    month: 'شهر',
    previous: 'سابق',
    next: 'التالي',
    today: 'اليوم',
    agenda: 'جدول أعمال',

    showMore: (total: any) => `+${total} إضافي`,
  },
}