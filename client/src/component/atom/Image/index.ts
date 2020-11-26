export { default } from './Image'

export namespace ImageType {
  export interface StyleAttributes extends Object {
    width?: string
    height?: string
    margin?: string
    padding?: string
    radius?: string
    cursor?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    url?: string
    onClick?: () => void
  }
}