/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react';

export function GhostInput({
  onChange,
}: {
  onChange?: (value: unknown) => void;
}) {
  const [input, setInput] = useState('');
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
    console.log(input.split('\n'));
    setInputHeight(divRef.current?.offsetHeight!);
    setInputWidth(divRef.current?.offsetWidth!);
  }, [divRef, divRef.current, input]);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        position: 'relative',
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
        }}
      />
      <div
        ref={divRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
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
            }}>
            #공개SW개발자대회 채널에 메세지 보내기
          </span>
        ) : (
          input.split('\n').map((val, key) => (
            <span
              style={{
                minHeight: '20px',
                color: '#42464A',
                fontSize: '1rem',
                letterSpacing: '-0.01rem',
              }}
              key={key}>
              {val}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
