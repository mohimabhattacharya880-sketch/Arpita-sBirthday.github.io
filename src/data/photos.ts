export interface BirthdayPhoto {
  id: number
  caption: string
  tone: string
  image?: string
}

export const birthdayPhotos: BirthdayPhoto[] = [
  { id: 1, caption: 'A little golden hour', tone: 'peach' },
  { id: 2, caption: 'The happy moments', tone: 'lavender' },
  { id: 3, caption: 'A day to remember', tone: 'rose' },
  { id: 4, caption: 'Simply wonderful', tone: 'blue' },
  { id: 5, caption: 'More lovely memories', tone: 'gold' },
  { id: 6, caption: 'Always a reason to smile', tone: 'plum' },
]
