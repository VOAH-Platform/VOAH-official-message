import {
  Asterisk,
  Hexagon,
  Minus,
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
import { useEffect, useRef, useState } from 'react';

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
  const textareaRef = useRef(null);
  const hiddenTextareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    // const hiddenTextarea = hiddenTextareaRef.current;

    textarea.value = value;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleChange = (e) => {
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
        <InputText
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder="공개SW개발자대회에 메시지 보내기"
        />
        <CommitBtn>
          <SendHorizontal color="white" size={25} />
        </CommitBtn>
      </TextForm>
      <TextOption>
        <Upload color="#9099a6" size={25} style={{ cursor: 'pointer' }} />{' '}
        {/* 팔래트 적용이 안돼요ㅜㅜ */}
        <AlertCircle color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <Line />
        <Bold color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <Italic color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <Strikethrough
          color="#9099a6"
          size={25}
          style={{ cursor: 'pointer' }}
        />
        <Underline color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <Line />
        <Heading1 color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <Heading2 color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <Heading3 color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <Line />
        <Link color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <Code2 color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <Quote color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <List color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
        <ListOrdered color="#9099a6" size={25} />
        <Line />
        <Smile color="#9099a6" size={25} style={{ cursor: 'pointer' }} />
      </TextOption>
      <TypingWrapper>
        <Keyboard color="#5f666d" size={20} style={{ cursor: 'pointer' }} />
        <Typing>
          {writingUser.length === 0
            ? null
            : writingUser.map((e) => ' ' + e) + ' 님이 입력하고 있어요...'}
        </Typing>
      </TypingWrapper>
    </TextAreaWrapper>
  );
}
