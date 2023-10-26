// import { Mention } from '../TextArea/style';

import { Reply } from 'lucide-react';

import { ProfileImg } from './profileImg';
import { MessageState } from './State/messageState';
import {
  MessageHeader,
  MessageWrapper,
  Writer,
  OtherHeaderText,
  Content,
  AnswerContent,
  AnswerText,
  Text,
  UserState,
  UserStateBox,
} from './style';
import { getMessageStateClassName } from './utils';

import './style.scss';
import { markdown, removeFormattingChars } from '../GhostInput/markdown';

import DOMPurify from 'dompurify';
// import { styled } from '@/stitches.config';

export function Message({
  order,
  length,
  userId,
  priority,
  messageContent,
  messageDate,
  isMessageEdited,
  isMessageAnswering,
  AnsweringMessage,
  AnsweringUserId, // attachmentType,attachmentUrl,
}: {
  // ...props
  userId: string;
  priority: number;
  messageContent: string;
  messageDate: string;
  isMessageEdited: boolean;
  isMessageAnswering: boolean;
  AnsweringUserId: string | null;
  AnsweringMessage: string | null;
  attachmentType: string | null;
  attachmentUrl: string | null;
  [key: string]: unknown;
}) {
  return (
    <div
      style={{ marginTop: '0.75rem' }}
      className={String(length) == String(order) ? 'this' : undefined}>
      {isMessageAnswering ? (
        <AnswerContent>
          <Reply
            size={20}
            color="#af57d9"
            style={{
              transform: 'scaleX(-1)',
              color: '$primary400',
            }}
          />
          <AnswerText style={{ color: '#af57d9', fontWeight: 'bold' }}>
            @{AnsweringUserId}
          </AnswerText>
          <AnswerText>{AnsweringMessage}</AnswerText>
        </AnswerContent>
      ) : (
        <></>
      )}
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
            <OtherHeaderText>{messageDate}</OtherHeaderText> {/* date */}
          </MessageHeader>
          <Text>
            {/* {AnsweringUserId !== null ? <Mention>{'@' + mention}</Mention>} :  */}
            {messageContent.split('\n').map((val, key) => (
              <span
                dangerouslySetInnerHTML={{
                  __html: removeFormattingChars(
                    markdown(DOMPurify.sanitize(val)),
                  ),
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
            ))}
            {isMessageEdited ? (
              <OtherHeaderText>(수정됨)</OtherHeaderText>
            ) : (
              <></>
            )}
          </Text>
        </Content>
      </MessageWrapper>
    </div>
  );
}
