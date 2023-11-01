const replacingMap: {
  [key: string]: string[];
} = {
  bold: ['**', '<span style="text-shadow:0px 0px 1px black;">', '</span>'],
  italic1: ['*', '<i>', '</i>'],
  italic2: ['_', '<i>', '</i>'],
  swung: ['~~', '<s>', '</s>'],
  underLine: ['__', '<u>', '</u>'],
  quote: ['`', '<code>', '</code>'],
  mention: [
    '@',
    '<span style="background:#E43475; color:white; font-weight:600">',
    '</span>',
  ], //mention
  h3: ['### ', '#', ''],
  h2: ['## ', '#', ''],
  h1: ['# ', '#', ''],
  list: ['- ', '-', ''],
};

/** ~~(문)~~ -> ~~<t1>(문)<t2>~~으로 바꾸는 것처럼. 특정 문자기호에 대하여 감싸진 부분을 태그로 적용하는 함수 */
function replaceStr(
  input: string,
  subject: string,
  tag1: string,
  tag2: string,
): string {
  const escapedSubject = subject.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');
  if (tag2 === '') {
    // 줄의 마지막까지 포함하여 header markdown을 찾는 패턴을 사용
    const pattern = new RegExp(
      escapedSubject + '([^' + escapedSubject + ']+)($|\\n)',
      'g',
    );
    return input.replace(
      pattern,
      '<span style="text-shadow:0px 0px 1px black;">' +
        escapedSubject +
        '$1</span>$2',
    );
  }

  // markdown 문자 두개를 찾아 사이의 문자열을 감싸는 태그를 생성
  const pattern = new RegExp(escapedSubject + '(.*?)' + escapedSubject, 'g');
  let replacedStr = input.replace(pattern, (_, innerContent) => {
    return subject + tag1 + innerContent + tag2 + subject;
  });

  // <s></s> 사이에 아무것도 없으면 다시 ~~로 바꿔줌
  replacedStr = replacedStr.replace(
    RegExp(escapedSubject + tag1 + tag2 + escapedSubject, 'g'),
    subject + subject,
  );

  return replacedStr;
}

/** replacingMap 배열을 토대로 replaceStr를 실행하여 문자열을 마크다운형식으로 바꾸는 함수 */
export function markdown(str: string) {
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

/** 특수문자를 없에고 태그만 남기는 함수  */
export function removeFormattingChars(input: string): string {
  for (const pattern of Object.values(replacingMap)) {
    const subject = pattern[0].replace(/([.*+?^${}()|[\]\\])/g, '\\$1');
    const tagStart = pattern[1];
    const tagEnd = pattern[2];

    if (tagEnd === '') {
      const regex = new RegExp(
        subject +
          '(?=<span style="text-shadow:0px 0px 1px black;">)|(?<=</span>)' +
          subject,
        'g',
      );
      input = input.replace(regex, '');
    } else {
      const regex = new RegExp(
        subject + '(?=' + tagStart + ')|(?<=' + tagEnd + ')' + subject,
        'g',
      );
      input = input.replace(regex, '');
    }
  }
  return input;
}

/** markdown, removeFormattingChars를 거친 문자열을 다시 원래 상태로 복구시키는 함수  */
export function reverseMarkdown(str: string): string {
  // 헤더 처리
  const headerPatterns = ['h1', 'h2', 'h3', 'list'];
  for (const header of headerPatterns) {
    const [subject, ,] = replacingMap[header];
    const pattern = new RegExp(
      '<span style="text-shadow:0px 0px 1px black;">' +
        subject +
        '(.*?)</span>',
      'gm',
    );
    str = str.replace(pattern, subject + '$1');
  }

  for (const i of Object.keys(replacingMap)) {
    if (headerPatterns.includes(i)) continue; // 이미 처리된 헤더는 건너뛴다

    // 헤더 이외 처리
    const [subject, tag1, tag2] = replacingMap[i];

    const escapedTag1 = tag1.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');
    const escapedTag2 = tag2.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');

    const pattern = new RegExp(escapedTag1 + '(.*?)' + escapedTag2, 'g');
    str = str.replace(pattern, subject + '$1' + subject);
  }

  return str;
}
