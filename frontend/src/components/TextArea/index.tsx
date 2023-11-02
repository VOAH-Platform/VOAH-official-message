import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { useAtom } from 'jotai';
import {
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
  Smile,
  Keyboard,
} from 'lucide-react';
import { useState, useRef } from 'react';

import { postData } from '@/utils/index';

import { FileContent } from '../FileContent';
import { GhostInput, moveCursorBack } from '../GhostInput';
import { inputAtom, sendInputAtom } from '../GhostInput/inputAtom';
import { priorityAtom } from '../Message/priorityAtom';

import { Line } from './line';
import { PrioritySelector } from './prioritySelector';
import {
  TextAreaWrapper,
  TextForm,
  CommitBtn,
  TextOption,
  TypingWrapper,
  Typing,
  InputWrapper,
  FileWrapper,
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
  const divRef = useRef<HTMLDivElement>(null);

  onChange?.(divRef.current?.offsetHeight);

  const [priority, setPriority] = useAtom(priorityAtom);
  const [showSelectPriority, setShowSelectPriority] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleGhostInputHeightChange = () => {
    // console.log('GhostInput height changed:', height);
    // console.log(`divRef:${divRef.current?.offsetHeight!}`);
    onChange?.(divRef.current?.offsetHeight);
  };

  const emojiInput = (emojiData: EmojiClickData) => {
    setInput(input + emojiData.emoji);
    setShowEmoji(false);
  };

  const commitMessage = async (): Promise<void> => {
    if (sendInput !== '') {
      await postData(input, priority);
      setInput('');
      setPriority(1);
    }
  };

  function markdownKeyPress(tagChar: string): void {
    setInput(input + tagChar + tagChar);
    setTimeout(() => {
      moveCursorBack(tagChar.length);
    }, 1);
  }

  function initialMarkdownKeyPress(tagChar: string): void {
    setInput(tagChar + input);
    setTimeout(() => {
      moveCursorBack(0);
    }, 1);
  }

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
      {showSelectPriority ? <PrioritySelector /> : null}
      {showFiles ? (
        // 파일
        <FileWrapper>
          <FileContent
            type="HWP"
            capacity="64KB"
            name="자퇴서"
            isPicture={false}
            canDownload={false}
          />
          <FileContent
            type="PNG"
            capacity="1.2MB"
            name="증명사진"
            isPicture={true}
            canDownload={false}
          />
        </FileWrapper>
      ) : (
        <></>
      )}
      {showEmoji ? (
        <EmojiPicker
          autoFocusSearch={false}
          emojiStyle={EmojiStyle.NATIVE}
          onEmojiClick={emojiInput}
        />
      ) : (
        <></>
      )}
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
        <Upload
          onClick={() => {
            setShowSelectPriority(false);
            setShowEmoji(false);
            setShowFiles(!showFiles);
            //현재 files 디자인만 완성됨
          }}
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
        />
        <AlertCircle
          onClick={() => {
            setShowFiles(false);
            setShowEmoji(false);
            setShowSelectPriority(!showSelectPriority);
          }}
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
        />
        <Line />
        <Bold
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            markdownKeyPress('**');
          }}
        />
        <Italic
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            markdownKeyPress('*');
          }}
        />
        <Strikethrough
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            markdownKeyPress('~~');
          }}
        />
        <Underline
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            markdownKeyPress('__');
          }}
        />
        <Line />
        <Heading1
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            initialMarkdownKeyPress('# ');
          }}
        />
        <Heading2
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            initialMarkdownKeyPress('## ');
          }}
        />
        <Heading3
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            initialMarkdownKeyPress('### ');
          }}
        />
        <Line />
        <Link
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            markdownKeyPress('^');
          }}
        />
        <Code2
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            markdownKeyPress('`');
          }}
        />
        <Quote
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer', color: '$gray400' }}
          onClick={() => {
            markdownKeyPress("'");
          }}
        />
        <List
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            initialMarkdownKeyPress('- ');
          }}
        />
        <Line />
        <Smile
          size={25}
          color="#9099a6"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setShowFiles(false);
            setShowSelectPriority(false);
            setShowEmoji(!showEmoji);
          }}
        />
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
