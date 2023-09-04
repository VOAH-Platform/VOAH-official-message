import { ButtonWrapper } from './style';

export function ExampleButton({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  return (
    <ButtonWrapper type="button" {...props}>
      {children}
    </ButtonWrapper>
  );
}
