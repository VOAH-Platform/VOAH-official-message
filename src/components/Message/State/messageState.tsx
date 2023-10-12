import { Asterisk, Hexagon } from 'lucide-react';

import { StateImportant, StateEmergency } from '../style';

interface MessageStateProps {
  showComponent: string;
}

export const MessageState: React.FC<MessageStateProps> = ({
  showComponent,
}) => {
  switch (showComponent) {
    case 'deafult':
      return null;
    case 'emergency':
      return (
        <div>
          <StateImportant>
            <Asterisk size={12} color="white" /> 긴급
          </StateImportant>
        </div>
      );
    case 'important':
      return (
        <div>
          <StateEmergency>
            <Hexagon size={12} color="white" /> 중요
          </StateEmergency>
        </div>
      );
  }
};
