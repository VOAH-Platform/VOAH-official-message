import { styled } from '@/stitches.config';

export const TextAreaWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  // margin: '0 1rem',
  justifyContent: 'space-between',
  alignItems: 'start',
  alignSelf: 'stretch',
  background: '$gray0',
  position: 'fixed',
  width: '100vw',
  bottom: '0',
  left: '0',
});

export const FileWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5rem',
  marginTop: '0.5rem',
});

export const SelectMessageState = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '11rem',
  height: '9.5rem',
  padding: '1rem 2.5rem 1rem 1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: '1rem',
  boxShadow: '$grade2',
});

export const StateButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexDirection: 'row',
  width: '8rem',
  height: '2.5rem',
  padding: '0.5rem',
  background: '$gray0',
  border: 'none',
});

export const Circle = styled('div', {
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
});

/** 메시지 입력창과 전송 버튼 감쌈 */
export const TextForm = styled('div', {
  display: 'flex',
  gap: '0.25rem',
  width: '100%',
  maxHeight: '10rem',
  overflowY: 'scroll',
  margin: '0.5rem 0',
  padding: '0.5rem',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  border: '2px solid $gray200',
  borderRadius: '1rem',
});

export const InputWrapper = styled('div', {
  width: '100%',
  height: '100%',
  maxHeight: '10rem',
  paddingLeft: '0.5rem',
  display: 'flex',
  overflowY: 'scroll',
  justifyContent: 'flex-start',
  alignItems: 'center',
  background: '$gray0',
  color: '$gray400',

  '&::-webkit-scrollbar': {
    margin: '4px 4px 4px 0',
  },
});

/** 입력창 */
export const InputText = styled('textarea', {
  margin: '0',
  padding: '0',
  width: '100%',
  height: '100%',
  maxHeight: '8.5rem',
  display: 'flex',
  resize: 'none',
  overflowY: 'scroll',
  border: 'none',
  outline: 'none',
  background: '$gray0',
  color: '$gray400',
  fontFamily: 'SUIT',
  fontSize: '1rem',
  fontStyle: 'normal',
  fontWeight: '500',
  letterSpacing: '-0.16px',
});

export const CommitBtn = styled('button', {
  width: '3.25rem',
  height: '3.25rem',
  border: '2px solid $gray200',
  borderRadius: '1rem',
  background: '$secondary400',
  textAlign: 'center',
  cursor: 'pointer',
});

/** 텍스트 옵션(굵기 같은거) */
export const TextOption = styled('div', {
  width: '100%',
  height: '3.375rem',
  display: 'flex',
  position: 'static',
  zIndex: 1000,
  padding: '16px 24px',
  alignItems: 'center',
  gap: '16px',
  alignSelf: 'stretch',
  borderRadius: '12px',
  background: '$gray100',
});

/** 키보드 아이콘 + -님이 입력중 감쌈 */
export const TypingWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  margin: '0.25rem',
});

/** -님이 입력중 */
export const Typing = styled('div', {
  marginLeft: '0.25rem',
  color: '$gray500',
  fontFamily: 'SUIT',
  fontSize: '1rem',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '140%',
  letterSpacing: '-0.12px',
  userSelect: 'none',
});
