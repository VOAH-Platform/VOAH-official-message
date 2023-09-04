import { styled } from '@/stitches.config';

export const MessageWrapper = styled('div', {
  padding: '1rem 1.25rem',
  borderRadius: '0.5rem',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  marginRight: '0.75rem',
  // backgroundColor: '$accept500',
  backgroundColor: 'rgba(39, 178, 120, 0.1)',
  // opacity: '0.1',
  width: '100vw',
});

export const Content = styled('div', {
  marginLeft: '0.75rem',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
});

export const MessageHeader = styled('div', {
  marginBottom: '0.25rem',
  color: '$gray900',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',
});

export const State = styled('div', {
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

export const Date = styled('div', {
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

export const Text = styled('div', {
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

export const UserStateBox = styled('div', {
  position: 'relative',
});
