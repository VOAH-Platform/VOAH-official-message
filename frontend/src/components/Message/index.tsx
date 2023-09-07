// import { Mention } from '../TextArea/style';

import { ProfileImg } from './profileImg';
import { MessageState } from './State/messageState';
import {
  MessageHeader,
  MessageWrapper,
  Writer,
  Date,
  Content,
  Text,
  UserState,
  UserStateBox,
} from './style';
import { getMessageStateClassName } from './utils';
import './style.scss';

export function Message({
  userId,
  priority,
  messageContent,
  messageDate,
  messageIsEdited,
  attachmentType,
  attachmentUrl,
  ...props
}: {
  userId: string;
  priority: number;
  messageContent: string;
  messageDate: string;
  messageIsEdited: boolean;
  attachmentType: string;
  attachmentUrl: string;
  [key: string]: unknown;
}) {
  return (
    <MessageWrapper
      className={`message-wrapper ${getMessageStateClassName(priority)}`}>
      <UserStateBox>
        <ProfileImg />
        <UserState />
      </UserStateBox>
      <Content>
        <MessageHeader>
          <MessageState showComponent={getMessageStateClassName(priority)} />
          <Writer>{userId}</Writer>
          <Date>{messageDate}</Date>
          <>{messageIsEdited}</>
        </MessageHeader>
        <Text>
          {/* {mention === null ? '' : <Mention>{'@' + mention}</Mention>} */}
          {messageContent}
        </Text>
      </Content>
    </MessageWrapper>
  );
}
