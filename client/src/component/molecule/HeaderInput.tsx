import React from 'react'
import styled from 'styled-components'
import A from '@atom'
import M from '@molecule'
import myIcon from '@constant/icon'

const StyledHeader = styled.div`
  background-color: #1f57e7;
  height: 4vh;
  width: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const IconFirstStyle = {
  color: 'white',
  fontSize: '15px;',
  margin: '3px 15px 0px 0px;',
}

const IconSecondStyle = {
  color: 'white',
  fontSize: '12px;',
  margin: '0px 10px 0px 0px;',
}

const IconThirdStyle = {
  color: 'white',
  fontSize: '15px;',
  margin: '3px 0px 0px 15px;',
}

const buttonStyle = {
  width: '40vh',
  padding: '2px 0px 2px 0px',
  backgroundColor: 'lightBlue',
  rounded: true,
  border: '1px solid white',
  hover: true,
}

const textStyle = {
  color: 'white',
  fontSize: '1.2rem',
}

interface Props {
  onClick?: () => void
}

const HeaderInput = ({ onClick }: Props) => {
  return (
    <StyledHeader>
      <A.Icon icon={myIcon.clock} customStyle={IconFirstStyle} />
      <M.ButtonDiv
        buttonStyle={buttonStyle}
        textStyle={textStyle}
        onClick={onClick}
      >
        <>
          <A.Icon icon={myIcon.search} customStyle={IconSecondStyle} />
          Search 부스트캠프 멤버쉽 2020
        </>
      </M.ButtonDiv>
      <A.Icon icon={myIcon.question} customStyle={IconThirdStyle} />
    </StyledHeader>
  )
}

export default HeaderInput