import { styled } from '@/stitches.config';

export const FileBox = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: '16.25rem',
  height: '5rem',
  padding: ' 1rem 1.5rem 1rem 1.5rem',
  alignItems: 'center',
  justifyContent: 'start',
  gap: '0.75rem',
  borderRadius: '1rem',
  background: '$gray100',
});

export const FileContents = styled('div', {
  width: '10rem',
  display: 'flex',
  flexDirection: 'column',
});

export const FilePicture = styled('div', {
  width: '4rem',
  height: '4rem',
  borderRadius: '0.75rem',
  background: '$accept400',
});

export const FileHeaderText = styled('span', {
  color: 'gray400',
  fontFamily: 'SUIT',
  fontSize: '0.75rem',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '140%',
  letterSpacing: '-0.0075rem',
  userSelect: 'none',
});

export const FileText = styled('div', {
  color: 'gray700',
  fontFamily: 'SUIT',
  fontSize: '1rem',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '140%',
  letterSpacing: '-0.01rem',
});
