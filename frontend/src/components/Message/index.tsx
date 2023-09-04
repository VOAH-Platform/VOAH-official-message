import { Asterisk } from 'lucide-react';

import { ProfileImg } from './profileImg';
import { UserStateData, MessageStateData } from './states';
import {
  MessageHeader,
  MessageWrapper,
  State,
  Writer,
  Date,
  Content,
  Text,
  UserState,
  UserStateBox,
} from './style';

export function Message({
  children,
  profileImage,
  profileState,
  messageState,
  writer,
  date,
  ...props
}: {
  children: React.ReactNode;
  profileImage: undefined /* img 타입이 뭐지 */;
  profileState: UserStateData;
  messageState: MessageStateData;
  writer: string;
  date: string /* 날짜를 나타내는 좋은 방법이 있을까 */;
  [key: string]: unknown;
}) {
  return (
    <MessageWrapper>
      <UserStateBox>
        <ProfileImg />
        <UserState />
      </UserStateBox>
      <Content>
        <MessageHeader>
          <State>
            <Asterisk color="white" size={12} /> 긴급
          </State>
          <Writer>{writer}</Writer>
          <Date>{date /** 날짜를 가공해서 데이터를 보여주기 */}</Date>
        </MessageHeader>
        <Text>{children}</Text>
      </Content>
    </MessageWrapper>
  );
}
