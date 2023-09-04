import { styled } from '@/stitches.config';

export const TextAreaWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  margin: '1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  background: '$gray0',
});

export const TextForm = styled('div', {
  display: 'flex',
  width: '100%',
  height: '3.375rem',
  marginBottom: '0.5rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
});

export const InputText = styled('textarea', {
  width: '100%',
  height: '100%',
  paddingLeft: '1rem',
  marginRight: '1.5rem',
  resize: 'none',
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
  border: '2px solid $gray200',
  borderRadius: '1rem',
  background: '$secondary400',
  textAlign: 'center',
});

export const TextOption = styled('div', {
  width: '100%',
  height: '3.375rem',
  display: 'flex',
  padding: '16px 24px',
  alignItems: 'center',
  gap: '16px',
  alignSelf: 'stretch',
  borderRadius: '12px',
  background: '$gray100',
});
