export const EMAIL = 'hello@mainframe.co'

// The brief supplies no destination pages. These mail links are intentional
// temporary destinations, approved by the user; replace hrefs here when ready.
export const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`

export const navigation = [
  { label: 'Labs', href: mailto('Tell me about Mainframe Labs') },
  { label: 'Studio', href: mailto('Tell me about the Mainframe studio') },
  { label: 'Openings', href: mailto('Working at Mainframe') },
  { label: 'Shop', href: mailto('Mainframe shop enquiry') },
]

export const actions = [
  { label: 'Pitch us an idea', href: mailto('An idea for Mainframe') },
  { label: 'Come work here', href: mailto('Working at Mainframe') },
  { label: 'Send a brief hello', href: mailto('A brief hello') },
  { label: 'See how we operate', href: mailto('How does Mainframe operate?') },
]
