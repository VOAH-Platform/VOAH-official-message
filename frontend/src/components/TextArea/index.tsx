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
  ListOrdered,
  Smile,
} from 'lucide-react';

import { Line } from './line';
import {
  TextAreaWrapper,
  InputText,
  TextForm,
  CommitBtn,
  TextOption,
} from './style';

export function TextArea({ ...props }: { [key: string]: unknown }) {
  return (
    <TextAreaWrapper {...props}>
      <TextForm>
        <InputText placeholder="공개SW개발자대회에 메시지 보내기" />
        <CommitBtn>
          <SendHorizontal color="white" size={25} />
        </CommitBtn>
      </TextForm>
      <TextOption>
        <Upload color="#9099a6" size={25} /> {/* 팔래트 적용이 안돼요ㅜㅜ */}
        <AlertCircle color="#9099a6" size={25} />
        <Line />
        <Bold color="#9099a6" size={25} />
        <Italic color="#9099a6" size={25} />
        <Strikethrough color="#9099a6" size={25} />
        <Underline color="#9099a6" size={25} />
        <Line />
        <Heading1 color="#9099a6" size={25} />
        <Heading2 color="#9099a6" size={25} />
        <Heading3 color="#9099a6" size={25} />
        <Line />
        <Link color="#9099a6" size={25} />
        <Code2 color="#9099a6" size={25} />
        <Quote color="#9099a6" size={25} />
        <List color="#9099a6" size={25} />
        <ListOrdered color="#9099a6" size={25} />
        <Line />
        <Smile color="#9099a6" size={25} />
      </TextOption>
    </TextAreaWrapper>
  );
}
