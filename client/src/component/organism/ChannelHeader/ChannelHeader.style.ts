import styled from 'styled-components'
import color from '@constant/color'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  // padding: 10px 20px;
  width: 100%;
  height: 100%;
`

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const MemberCountWrapper = styled.div`
  width: 1.5rem;
  &:hover {
    background-color: ${color.get('whiteHover')};
  }
`

export default {
  Wrapper,
  LeftWrapper,
  RightWrapper,
  MemberCountWrapper,
}
