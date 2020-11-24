import React from 'react'
import styled from 'styled-components'
import colors from '@constant/color'

namespace TextType {
  export interface StyleAttributes extends Object {
    margin?: string
    padding?: string
    align?: string
    fontSize?: string
    fontWeight?: string
    color?: string
    hover?: boolean
    cursor?: string
    display?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    children?: React.ReactChild
    onClick?: () => void
  }
}

const StyledText = styled.p<TextType.StyleAttributes>`
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  color: ${({ color }) => colors.get(color)};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight === 'bold' && 'bold'};
  cursor: ${({ cursor }) => cursor};
  &:hover {
    color: ${({ hover }) => hover && colors.get('blue')};
  }
  display: ${({ display }) => display};
`

const defaultStyle: TextType.StyleAttributes = {
  margin: '0.3rem',
  padding: '0',
  color: '#000000',
  fontSize: '1rem',
  cursor: 'pointer',
  align: 'center',
  display: 'inline',
  hover: true,
}

const Text = ({
  customStyle = defaultStyle,
  children,
  onClick,
}: TextType.Props) => (
  <StyledText
    margin={customStyle.margin}
    padding={customStyle.padding}
    color={customStyle.color}
    fontSize={customStyle.fontSize}
    fontWeight={customStyle.fontWeight}
    display={customStyle.display}
    hover={customStyle.hover}
    onClick={onClick}
  >
    {children}
  </StyledText>
)

export default Text
