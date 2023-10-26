import { useAtom } from 'jotai';
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
  Asterisk,
  Hexagon,
  Minus,
} from 'lucide-react';
import { useState, useRef } from 'react';

import { postData } from '@/utils/index';

import { GhostInput } from '../GhostInput';
import { inputAtom, sendInputAtom } from '../GhostInput/inputAtom';
import { priorityAtom } from '../Message/priorityAtom';

import { Line } from './line';
import {
  TextAreaWrapper,
  TextForm,
  CommitBtn,
  TextOption,
  TypingWrapper,
  Typing,
  SelectMessageState,
  StateButton,
  InputWrapper,
  Circle,
} from './style';

export function TextArea({
  writingUser,
  onChange,
  ...props
}: {
  writingUser: Array<string>;
  onChange?: (event: number | undefined) => void;
  [key: string]: unknown;
}) {
  const [input, setInput] = useAtom(inputAtom);
  const [sendInput] = useAtom(sendInputAtom);
  const [priority, setPriority] = useAtom(priorityAtom);
  const [showSelectPriority, setShowSelectPriority] = useState(false);

  const handleGhostInputHeightChange = () => {
    // console.log('GhostInput height changed:', height);
    // console.log(`divRef:${divRef.current?.offsetHeight!}`);
    onChange?.(divRef.current?.offsetHeight);
  };

  const divRef = useRef<HTMLDivElement>(null);

  const commitMessage = async (): Promise<void> => {
    if (sendInput !== '') {
      await postData(input, priority);
      setInput('');
      setPriority(1);
    }
  };

  const inputDeleteKeyPress = async (
    e: React.KeyboardEvent<HTMLDivElement>,
  ): Promise<void> => {
    if (e.key === 'Enter' && !e.shiftKey) await commitMessage();
  };

  // useEffect(() => {
  //   console.log(`divRef22:${divRef.current?.offsetHeight!}`);
  // }, [divRef, divRef.current, divRef.current?.offsetHeight!]);

  return (
    <TextAreaWrapper
      ref={divRef}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
        inputDeleteKeyPress(e)
      }
      {...props}>
      {/* <div style={{ width: '100vw' }} ref={divRef}> */}
      {showSelectPriority ? (
        <SelectMessageState>
          <StateButton
            onClick={() => {
              setPriority(3);
            }}>
            <Circle
              style={{ background: priority === 3 ? '#f86060' : '#ffcaca' }}>
              <Asterisk color="white" size={20} />
            </Circle>
            <p
              style={{
                color: '$gray500',
                fontWeight: priority === 3 ? 'bold' : 'normal',
              }}>
              긴급
            </p>
          </StateButton>
          <StateButton
            onClick={() => {
              setPriority(2);
            }}>
            <Circle
              style={{ background: priority === 2 ? '#52c192' : '#cbeadb' }}>
              <Hexagon color="white" size={20} />
            </Circle>
            <p
              style={{
                color: '$gray500',
                fontWeight: priority === 2 ? 'bold' : 'normal',
              }}>
              중요
            </p>
          </StateButton>
          <StateButton
            onClick={() => {
              setPriority(1);
            }}>
            <Circle
              style={{ background: priority === 1 ? '#9099a6' : '#e2e7ec' }}>
              <Minus color="white" size={20} />
            </Circle>
            <p
              style={{
                color: '$gray500',
                fontWeight: priority === 1 ? 'bold' : 'normal',
              }}>
              일반 메시지
            </p>
          </StateButton>
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
        <CommitBtn onClick={commitMessage}>
          <SendHorizontal color="white" size={25} />
        </CommitBtn>
      </TextForm>
      <TextOption>
        <Upload size={25} color="#9099a6" style={{ cursor: 'pointer' }} />{' '}
        <AlertCircle
          onClick={() => {
            setShowSelectPriority(!showSelectPriority);
          }}
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
        />
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
