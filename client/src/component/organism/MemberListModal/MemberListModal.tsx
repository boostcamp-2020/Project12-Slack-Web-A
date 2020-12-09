import React, { useState, useEffect } from 'react'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import { TextType } from '@atom/Text'
import { ButtonType } from '@atom/Button'
import { InputType } from '@atom/Input'
import { ModalWrapperType } from '@atom/ModalWrapper'
import myIcon from '@constant/icon'
import color from '@constant/color'
import { UserType } from '@type/user.type'
import userAPI from '@api/user'
import { MemberListModalProps } from '.'
import Styled from './MemberListModal.style'

const MemberListModal = ({
  channel,
  onAddPeopleClick,
  onClose,
}: MemberListModalProps) => {
  const { id, type, name } = channel

  const [inputKeyword, setInputKeyword] = useState('')
  const [memberSearchResult, setMemberSearchResult] = useState<UserType[]>([])

  useEffect(() => {
    const getUsersByChannel = async () => {
      const { success, data } = await userAPI.getUsersByChannel({
        channelId: id,
      })
      if (success) setMemberSearchResult(data)
    }
    getUsersByChannel()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    setInputKeyword(inputValue)

    const searchMembers = async (searchKeyword: string) => {
      const { success, data } = await userAPI.searchMembers({
        channelId: id,
        searchKeyword,
      })
      if (success) {
        setMemberSearchResult(data)
        return
      }
      setMemberSearchResult([])
    }
    searchMembers(inputValue)
  }

  const handleClearSearchButtonClick = (): void => {
    setInputKeyword('')
  }

  return (
    <M.Modal
      overlayStyle={{ opacity: '0.4' }}
      modalWrapperStyle={modalWrapperStyle}
      onClose={onClose}
      fixed
    >
      <Styled.Wrapper>
        <Styled.UpperWrapper>
          <A.Text customStyle={modalTitleTextStyle}>
            <>
              {`${memberSearchResult.length} members in`}
              <A.Icon
                icon={type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock}
                customStyle={{ margin: '0 3px 0 6px' }}
              />
              {name}
            </>
          </A.Text>

          <A.Text customStyle={addPeopleTextStyle} onClick={onAddPeopleClick}>
            Add people
          </A.Text>

          <A.Input
            placeholder="Search members"
            value={inputKeyword}
            onChange={handleInputChange}
            customStyle={inputStyle}
          />
        </Styled.UpperWrapper>

        <Styled.MemberListWrapper>
          {memberSearchResult.length === 0 ? (
            <Styled.EmptyListWrapper>
              <A.Text customStyle={{ fontSize: '1.5rem' }}>
                <>
                  {'No matches found for '}
                  <A.Text customStyle={inputKeywordTextStyle}>
                    {inputKeyword}
                  </A.Text>
                </>
              </A.Text>
              <M.ButtonDiv
                buttonStyle={clearSearchButtonStyle}
                textStyle={clearSearchButtonTextStyle}
                onClick={handleClearSearchButtonClick}
              >
                Clear search
              </M.ButtonDiv>
            </Styled.EmptyListWrapper>
          ) : (
            memberSearchResult.map((member) => (
              <Styled.MemberWrapper key={member.id}>
                <O.Avatar user={member} size="BIG" clickable />
                <A.Text customStyle={memberNameTextStyle}>{member.name}</A.Text>
              </Styled.MemberWrapper>
            ))
          )}
        </Styled.MemberListWrapper>
      </Styled.Wrapper>
    </M.Modal>
  )
}

const modalWrapperStyle: ModalWrapperType.StyleAttributes = {
  width: 'auto',
  padding: '0',
  backgroundColor: 'white',
  border: '1px solid transparent',
  borderRadius: '8px',
  boxShadow: 'none',
  overflow: 'visible',
  position: 'fixed',
  left: '30%',
  top: '15%',
  right: '30%',
  bottom: '15%',
}

const modalTitleTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '22px',
  margin: '0 0 1rem 0',
}

const addPeopleTextStyle: TextType.StyleAttributes = {
  color: 'blue',
  fontWeight: '600',
  fontSize: '1.4rem',
}

const inputStyle: InputType.StyleAttributes = {
  border: '1px solid grey',
  borderRadius: '5px',
  padding: '0 10px',
  margin: '12px 0',
  fontSize: '1.4rem',
}

const inputKeywordTextStyle: TextType.StyleAttributes = {
  fontWeight: 'bold',
  margin: '0 0 0 5px',
}

const memberNameTextStyle: TextType.StyleAttributes = {
  fontWeight: '600',
  fontSize: '1.4rem',
  margin: '0 0 0 10px',
}

const clearSearchButtonStyle: ButtonType.StyleAttributes = {
  margin: '10px',
  padding: '10px',
  border: '1px solid grey',
  backgroundColor: 'white',
  hoverBackgroundColor: color.get('whiteHover'),
}

const clearSearchButtonTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
  fontWeight: '600',
}

export default MemberListModal
