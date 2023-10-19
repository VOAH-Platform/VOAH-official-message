function replaceStr(
  input: string,
  subject: string,
  tag1: string,
  tag2: string,
): string {
  const escapedSubject = subject.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');

  if (tag2 === '') {
    const pattern = new RegExp(
      escapedSubject + '([^' + escapedSubject + ']+)',
      'g',
    );
    return input.replace(pattern, '<b>' + escapedSubject + '$1</b>');
  }

  const pattern = new RegExp(escapedSubject + '(.*?)' + escapedSubject, 'g');
  let replacedStr = input.replace(pattern, (_, innerContent) => {
    //임시로 match를 _로 바꿈
    return subject + tag1 + innerContent + tag2 + subject;
  });

  // <s></s> 사이에 아무것도 없으면 다시 ~~로 바꿔줌
  replacedStr = replacedStr.replace(
    RegExp(escapedSubject + tag1 + tag2 + escapedSubject, 'g'),
    subject + subject,
  );

  return replacedStr;
}

export function markdowned(str: string) {
  const replacingMap: {
    [key: string]: string[];
  } = {
    bold: ['**', '<b>', '</b>'],
    italic: ['*', '<i>', '</i>'],
    italic2: ['_', '<i>', '</i>'],
    swung: ['~~', '<s>', '</s>'],
    underLine: ['__', '<u>', '</u>'],
    h3: ['### ', '###', ''],
    h2: ['## ', '##', ''],
    h1: ['# ', '#', ''],
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
