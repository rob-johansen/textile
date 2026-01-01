export enum Modifier {
  Alt = 'Alt',
  Control = 'Control',
  Meta = 'Meta',
  Shift = 'Shift',
}

export type Shortcut = {
  key: string
  mod1: string
  mod2?: string
}
