import { styled } from '@/stitches.config';

export const TextAreaWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  margin: '0 1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  background: '$gray0',
});

export const SelectMessageState = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '11rem',
  height: '9.5rem',
  padding: '1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  background: 'red',
  borderRadius: '1rem',
});

export const StateBox = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: '7rem',
  height: '2.5rem',
  padding: '0.5rem',
  color: 'White',
  background: 'blue',
});

/** 메시지 입력창과 전송 버튼 감쌈 */
export const TextForm = styled('div', {
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '3.375rem',
  marginBottom: '0.5rem',
  padding: '0.5rem 0.5rem 0.5rem 1.5rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
});

/** 입력창 */
export const InputText = styled('textarea', {
  width: '95%',
  maxHeight: '10rem',
  paddingLeft: '1rem',
  marginRight: '2rem',
  position: 'absolute',
  flex: 1,
  verticalAlign: 'bottom',
  display: 'flex',
  left: '0',
  bottom: '0',
  resize: 'none',
  overflowY: 'auto',
  border: '2px solid $gray200',
  background: '$gray0',
  borderRadius: '1rem',
  color: '$gray-400',
  fontFamily: 'SUIT',
  fontSize: '1rem',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '140%' /* 22.4px */,
  letterSpacing: '-0.16px',
});

export const CommitBtn = styled('button', {
  width: '3.25rem',
  height: '3.25rem',
  position: 'absolute',
  right: '0',
  float: 'right',
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
});
