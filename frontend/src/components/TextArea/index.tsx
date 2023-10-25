import {
  // Asterisk,
  // Hexagon,
  // Minus,
  SendHorizontal,
  Upload,
  AlertCircle,
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Code2,
  Quote,
  List,
  ListOrdered,
  Smile,
  Keyboard,
} from 'lucide-react';
import { useRef } from 'react';

import { GhostInput } from '../GhostInput';

import { Line } from './line';
import {
  TextAreaWrapper,
  TextForm,
  CommitBtn,
  TextOption,
  TypingWrapper,
  Typing,
  SelectMessageState,
  StateBox,
  InputWrapper,
} from './style';

export function TextArea({
  writingUser,
  showSelectMessageState,
  onChange,
  ...props
}: {
  writingUser: Array<string>;
  showSelectMessageState: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  [key: string]: unknown;
}) {
  const handleGhostInputHeightChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    // console.log('GhostInput height changed:', height);
    // console.log(`divRef:${divRef.current?.offsetHeight!}`);
    if (onChange) onChange(event);
  };

  const divRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   console.log(`divRef22:${divRef.current?.offsetHeight!}`);
  // }, [divRef, divRef.current, divRef.current?.offsetHeight!]);

  return (
    <TextAreaWrapper ref={divRef} {...props}>
      {/* <div style={{ width: '100vw' }} ref={divRef}> */}
      {showSelectMessageState ? (
        <SelectMessageState>
          <StateBox>
            <AlertCircle color="white" size={20} /> 긴급
          </StateBox>
          <StateBox>중요</StateBox>
          <StateBox>일반 메시지</StateBox>
        </SelectMessageState>
      ) : null}
      {/* <GhostInput /> */}
      <TextForm>
        <InputWrapper>
          <GhostInput onChange={handleGhostInputHeightChange} />
          {/* <InputText
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            placeholder="#공개SW개발자대회에 메시지 보내기"
          /> */}
        </InputWrapper>
        <CommitBtn>
          <SendHorizontal color="white" size={25} />
        </CommitBtn>
      </TextForm>
      <TextOption>
        <Upload size={25} color="#9099a6" style={{ cursor: 'pointer' }} />{' '}
        <AlertCircle size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
        <Line />
        <Bold size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
        <Italic size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
        <Strikethrough
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
        />
        <Underline size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
        <Line />
        <Heading1 size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
        <Heading2 size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
        <Heading3 size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
        <Line />
        <Link size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
        <Code2 size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
        <Quote
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer', color: '$gray400' }}
        />
        <List size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
        <ListOrdered size={25} color="#9099a6" />
        <Line />
        <Smile size={25} color="#9099a6" style={{ cursor: 'pointer' }} />
      </TextOption>
      <TypingWrapper>
        <Keyboard
          size={20}
          color="#5f666d"
          style={{ cursor: 'pointer', color: '$gray400' }}
        />
        <Typing>
          {writingUser.length === 0
            ? null
            : `${writingUser.join(' ')} 님이 입력하고 있어요...`}
        </Typing>
      </TypingWrapper>
      {/* </div> */}
    </TextAreaWrapper>
  );
}
