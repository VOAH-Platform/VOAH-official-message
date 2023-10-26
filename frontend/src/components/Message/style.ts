import { styled } from '@/stitches.config';

// import { AnswerContent } from './style';

export const AnswerContent = styled('div', {
  color: '$gray900',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
  marginLeft: '1rem',
});

export const AnswerText = styled('p', {
  margin: '0',
  fontSize: '1rem',
  marginLeft: '0.25rem',
});

export const MessageWrapper = styled('div', {
  padding: '1rem 1.25rem',
  borderRadius: '1rem',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  // backgroundColor: '$accept500',
  // backgroundColor: 'rgba(39, 178, 120, 0.1)',
  // opacity: '0.1',
  width: '100vw',
});

/** 프로필 이미지와 유저 상태를 감쌈 */
export const UserStateBox = styled('div', {
  position: 'relative',
});

/** 유저 상태 */
export const UserState = styled('div', {
  backgroundColor: '$accept500',
  width: '1.03125rem',
  height: '1.03125rem',
  letterSpacing: '-0.1',
  borderRadius: '0.5rem',
  position: 'absolute',
  bottom: '-3px',
  left: '24px',
});

/** 메시지 내용(작성자, 날짜, 글 내용 등)을 감쌈 */
export const Content = styled('div', {
  marginLeft: '0.75rem',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
});

/** 메시지 상태, 작성자, 날짜 */
export const MessageHeader = styled('div', {
  marginBottom: '0.25rem',
  color: '$gray900',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',
});

/** 메시지 상태 */
export const StateImportant = styled('div', {
  backgroundColor: '$warning500',
  display: 'flex',
  alignItems: 'center',
  padding: '0.25rem 0.5rem 0.25rem 0.375rem',
  gap: '0.125rem',
  fontWeight: '$semiBold',
  border: 'none',
  borderRadius: '0.375rem',
  color: '$white',
  textAlign: 'center',
  fontFamily: '$SUIT',
  fontSize: '0.5rem',
  fontStyle: 'normal',
  lineHeight: '100%',
  letterSpacing: '-0.005rem',
});

export const StateEmergency = styled('div', {
  backgroundColor: '$accept500',
  display: 'flex',
  alignItems: 'center',
  padding: '0.25rem 0.5rem 0.25rem 0.375rem',
  gap: '0.125rem',
  fontWeight: '$semiBold',
  border: 'none',
  borderRadius: '0.375rem',
  color: '$white',
  textAlign: 'center',
  fontFamily: '$SUIT',
  fontSize: '0.5rem',
  fontStyle: 'normal',
  lineHeight: '100%',
  letterSpacing: '-0.005rem',
});

export const Writer = styled('div', {
  color: '$gray700',
  fontFamily: '$SUIT',
  fontSize: '1rem',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '140%',
  letterSpacing: '-0.16px',
  border: 'none',
  cursor: 'pointer',
});

export const OtherHeaderText = styled('div', {
  color: '$gray400',
  fontFamily: '$SUIT',
  fontSize: '0.75rem',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '140%',
  letterSpacing: '-0.12px',
  borderRadius: '0.5rem',
  border: 'none',
});

/** 메시지 content */
export const Text = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  alignItems: 'start',
  color: '$gray600',
  fontFamily: '$SUIT',
  fontSize: '1rem',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '140%',
  letterSpacing: '-0.16px',
  borderRadius: '0.5rem',
  border: 'none',
});

/** 맨션: '@유저'  */
// export const Mention = styled('span', {
//   padding: '0 0.1rem',
//   marginRight: '0.2rem',
//   color: 'white',
//   backgroundColor: '$primary500',
//   fontStyle: 'bold',
//   borderRadius: '0.2rem',
// });
