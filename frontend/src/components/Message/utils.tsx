// export const getUserStateClassName = (userState: UserStateData): string => {
//   switch (userState) {
//     case UserStateData.ONLINE:
//       return 'online';
//     case UserStateData.LEFT_SEAT:
//       return 'left-seat';
//     case UserStateData.DND:
//       return 'do-not-distrub';
//     case UserStateData.OFFLINE:
//       return 'offline';
//     default:
//       return '';
//   }
// };

export const getMessageStateClassName = (messageState: number): string => {
  switch (messageState) {
    case 0:
      return 'deafult';
    case 1:
      return 'important';
    case 2:
      return 'emergency';
    // case MessageStateData.MENTION:
    //   return 'mention';
    // case MessageStateData.MENTION_ME:
    //   return 'mention-me';
    default:
      return '';
  }
};
