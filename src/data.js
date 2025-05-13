// ride-to-vote-data.js
export const eventDetails = [
  {
    icon: 'fas fa-calendar-day',
    title: 'Data',
    description: 'În ziua alegerilor prezidențiale',
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Punct de întâlnire',
    description:
      'Punctul de întâlnire va fi anunțat cu câteva zile înainte de eveniment. Revino vineri aici pentru detalii.',
  },
  {
    icon: 'fas fa-clock',
    title: 'Ora',
    description: 'La fel si ora de întâlnire. Vom updata pagina.',
  },
]

export const timelineSteps = [
  {
    number: '1',
    title: 'Înscrie-te',
    description:
      'Completează formularul și spune-ne la ce secție de votare vrei să ajungi. Ne asigurăm că drumul tău va fi perfect, inclus în circuit.',
    position: 'left',
  },
  {
    number: '2',
    title: 'Planificăm traseul',
    description:
      'Ne ocupăm noi de traseu! Vom crea o rută care să te aducă în siguranță la secția ta de votare, ținând cont de toți participanții.<br />Acolo te așteptăm să votezi, apoi pornim către următoarea secție. It is about the journey together.',
    position: 'right',
  },
  {
    number: '3',
    title: 'Ne întâlnim',
    description:
      'Pe 18 mai ne vedem la punctul de întâlnire și pornim împreună pe biciclete, într-o călătorie spre secțiile de votare.',
    position: 'left',
  },
  {
    number: '4',
    title: 'Pedalăm și votăm',
    description:
      'Pentru că fiecare pas contează și fiecare pedală ne aduce mai aproape de schimbare.',
    position: 'right',
  },
]

export const actionButtons = [
  {
    type: 'primary',
    text: 'ÎNSCRIE-TE AICI',
    icon: 'fas fa-user-plus',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeiN0q8f4bmPmn1rGiltKxN0Qdd2donwy4vYaVxYQrhf-LQCw/viewform',
  },
  {
    type: 'secondary',
    text: 'VEZI TRASEUL',
    icon: 'fas fa-route',
    url: 'https://goo.gl/maps/YourPlannedRouteLink',
  },
]

export const rules = [
  {
    icon: 'fas fa-helmet-safety',
    title: 'Siguranța pe primul loc',
    description: 'Poartă cască de protecție și respectă toate regulile de circulație.',
  },
  {
    icon: 'fas fa-users',
    title: 'Rămânem împreună',
    description: 'Grupul va merge împreună și nimeni nu va fi lăsat în urmă.',
  },
  {
    icon: 'fas fa-water',
    title: 'Aduceți',
    description: 'Apă, protecție solară, și, desigur, actele necesare pentru vot.',
  },
  {
    icon: 'fas fa-handshake',
    title: 'Respect',
    description: 'Acesta este un eveniment civic nepolitizat. Respectăm toate opiniile politice.',
  },
  {
    icon: 'fas fa-wrench',
    title: 'Pregătire',
    description: 'Verifică-ți bicicleta înainte de eveniment (frâne, anvelope, lanț).',
  },
  {
    icon: 'fas fa-ban',
    title: 'Fără alcool',
    description:
      'Nu este permis consumul de alcool sau substanțe interzise în timpul evenimentului.',
  },
]

export const colors = {
  light: {
    primaryColor: '#0BD66B',
    secondaryColor: '#301754',
    accentColor: '#0BD66B',
    altAccentColor: '#301754',
    bgColor: '#ffffff',
    textColor: '#230D3B',
    secondaryTextColor: '#FFFFFF',
  },
  dark: {
    primaryColor: '#0BD66B',
    secondaryColor: '#F2E9FF',
    accentColor: '#301754',
    altAccentColor: '#0BD66B',
    bgColor: '#230D3B',
    textColor: '#FFFFFF',
    secondaryTextColor: '#0bd66b',
  },
}
