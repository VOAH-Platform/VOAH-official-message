import { styled } from '@stitches/react';

export const NotFoundWrapper = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NotFoundTitle = styled('h1', {
  margin: 0,
  fontSize: '5rem',
  fontWeight: '$extraBold',
  color: '$gray900',
});

export const NotFoundSubtitle = styled('h2', {
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: '$bold',
  color: '$gray900',
});
