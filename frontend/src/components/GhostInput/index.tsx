/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import DOMPurify from 'dompurify';
import { useEffect, useRef, useState } from 'react';

import { markdown, removeFormattingChars } from './markdown';

export function GhostInput({
  onChange,
}: {
  onChange?: (value: unknown) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [input, setInput] = useState('');
  const [sendInput, setSendInput] = useState('');
  const [inputHeight, setInputHeight] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);

  const onChangeT =
    onChange ||
    function () {
      return;
    };
  useEffect(() => {
    // console.log(input.split('\n'));
    // console.log(processing(input.split('\n')[0]));n
    setInputHeight(divRef.current?.offsetHeight!);

    const tempStringArr = [];
    let tempString = '';
    for (const s of input.split('\n')) {
      tempStringArr.push(markdown(s));
      tempString += markdown(s) + '\n';
    }

    setSendInput(removeFormattingChars(tempString));

    console.log(sendInput);

    // console.log(`offSetHeight:${divRef.current?.offsetHeight!}`);
    setInputWidth(divRef.current?.offsetWidth!);
    onChangeT(divRef.current?.scrollHeight!);
  }, [divRef, divRef.current, input]);

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
                color: '#42464A',
                fontSize: '1rem',
                letterSpacing: '-0.01rem',
                wordBreak: 'break-all',
                whiteSpace: 'pre',
              }}
              key={key}></span>
          ))
        )}
      </div>
    </div>
  );
}
