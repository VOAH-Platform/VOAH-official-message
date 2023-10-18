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

  function replaceStr(
    input: string,
    subject: string,
    tag1: string,
    tag2: string,
  ): string {
    const escapedSubject = subject.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');
    let replacedStr = input;
    let count = 0;

    replacedStr = replacedStr.replace(RegExp(escapedSubject, 'g'), (match) => {
      count++;
      return count % 2 === 1 ? match + tag1 : tag2 + match;
    });

    // 만약 ~~ 가 홀수번 등장하면, 마지막 <s>를 ~~ 로 다시 바꿔줌
    if (count % 2 !== 0) {
      replacedStr = replacedStr.replace(
        RegExp(tag2 + escapedSubject + '(?!.*' + tag2 + escapedSubject + ')'),
        subject,
      );
    }

    // <s></s> 사이에 아무것도 없으면 다시 ~~로 바꿔줌
    replacedStr = replacedStr.replace(
      RegExp(escapedSubject + tag1 + tag2 + escapedSubject, 'g'),
      subject + subject,
    );

    return replacedStr;
  }

  function processing(str: string): string {
    const replacingMap: {
      [key: string]: string[];
    } = {
      bold: ['**', '<b>', '</b>'],
      italic: ['*', '<i>', '</i>'],
      italic3: ['_', '<i>', '</i>'],
      swung: ['~~', '<s>', '</s>'],
      underLine: ['__', '<u>', '</u>'],
    };
    for (const i of Object.keys(replacingMap)) {
      str = replaceStr(
        str,
        replacingMap[i][0],
        replacingMap[i][1],
        replacingMap[i][2],
      );
    }
    return str;
  }

  useEffect(() => {
    console.log(input.split('\n'));
    console.log(processing(input.split('\n')[0]));
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
