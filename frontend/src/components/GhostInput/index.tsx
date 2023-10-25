/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import DOMPurify from 'dompurify';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { inputAtom, sendInputAtom } from './inputAtom';
import {
  markdown,
  removeFormattingChars /** reverseMarkdown, */,
} from './markdown';

export function GhostInput({
  onChange,
}: {
  onChange?: (value: string) => void;
}) {
  const [input, setInput] = useAtom(inputAtom);
  const [, setSendInput] = useAtom(sendInputAtom);
  const [inputHeight, setInputHeight] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);

  const divRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const onChangeT =
    onChange ||
    function () {
      return;
    };

  useEffect(() => {
    if (input.length > 500) {
      setInput(input.substring(0, 500));
      return;
    }

    // console.log(input.split('\n'));
    // console.log(processing(input.split('\n')[0]));
    setInputHeight(divRef.current?.offsetHeight!);

    const tempStringArr = [];
    let tempString = '';
    for (const s of input.split('\n')) {
      tempStringArr.push(markdown(s));
      tempString += markdown(s) + '\n';
    }

    setSendInput(removeFormattingChars(tempString));
    // console.log(`offSetHeight:${divRef.current?.offsetHeight!}`);
    setInputWidth(divRef.current?.offsetWidth!);
  }, [divRef, divRef.current, input]);

  /** 매시지 수정(메시지 불러오기) 함수 */
  // **************** importMessage 함수를 사용할 경우 밑의 명령은 지우시오 ******************
  // const importMessage = (message: string): string => {
  //   setSendInput('');
  //   setInput(reverseMarkdown(message));
  //   return reverseMarkdown(message);
  // };

  return (
    <div
      style={{
        margin: '0.5rem 0',
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
      <textarea
        id="ghost"
        ref={textRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          onChangeT(input);
        }}
        onKeyDown={(e) => {
          //enter만 누르면 줄바꿈 x
          if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        style={{
          padding: '0',
          position: 'absolute',
          top: '0',
          width: `${inputWidth}px`,
          height: `${inputHeight}px`,
          overflow: 'hidden',
          outline: 'none',
          border: 'none',
          resize: 'none',
          color: 'transparent',
          background: 'transparent',
          fontSize: '1rem',
          letterSpacing: '-0.01rem',
          caretColor: 'black',
          wordBreak: 'break-all',
        }}
      />
      <div
        ref={divRef}
        style={{
          width: '100%',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          wordBreak: 'break-all',
        }}
        onClick={() => {
          document.getElementById('ghost')?.focus();
        }}>
        {input === '' ? (
          <span
            style={{
              color: '#9099A6',
              fontSize: '1rem',
              letterSpacing: '-0.01rem',
              wordBreak: 'break-all',
            }}>
            #공개SW개발자대회 채널에 메세지 보내기
          </span>
        ) : (
          input.split('\n').map((val, key) => (
            <span
              dangerouslySetInnerHTML={{
                __html: markdown(DOMPurify.sanitize(val)),
              }}
              style={{
                minHeight: '20px',
                color: '$gray600',
                fontSize: '1rem',
                letterSpacing: '-0.01rem',
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
              }}
              key={key}></span>
          ))
        )}
      </div>
    </div>
  );
}
