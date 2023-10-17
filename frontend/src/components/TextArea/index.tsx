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
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Line } from './line';
import {
  TextAreaWrapper,
  InputText,
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
  ...props
}: {
  writingUser: Array<string>;
  showSelectMessageState: boolean;
  [key: string]: unknown;
}) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // const hiddenTextareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    // const hiddenTextarea = hiddenTextareaRef.current;

    if (textarea != null) {
      textarea.value = value;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <TextAreaWrapper {...props}>
      {showSelectMessageState ? (
        <SelectMessageState>
          <StateBox>
            <AlertCircle color="white" size={20} /> 긴급
          </StateBox>
          <StateBox>중요</StateBox>
          <StateBox>일반 메시지</StateBox>
        </SelectMessageState>
      ) : null}
      <TextForm>
        <InputWrapper>
          <InputText
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            placeholder="공개SW개발자대회에 메시지 보내기"
          />
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
    </TextAreaWrapper>
  );
}
