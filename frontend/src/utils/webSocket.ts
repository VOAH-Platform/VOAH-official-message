// export const s = () => {
//   const socket = new WebSocket(
//     'ws://test-voah-message.zirr.al/api/chat/ws/5264cbbc-0f43-4bad-a3a3-3616072fb6c1t',
//     {
//       headers: {
//         Authorization:
//           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc4MDI4NDUsInV1aWQiOiIxYTgyOGZhNC04ZDc2LTQxNzAtOGY2MS05MjdiMWI3YjNhZmQifQ.EHKEz-Yd1lYYsL6M5owAyjtjNqsU5axY0bzYx1Iej-4n',
//       },
//     },
//   );

//   socket.onopen = function () {
//     console.log('connected to websocket');
//   };
//   socket.onmessage = function (event) {
//     console.log(event.data);
//     socket.send('send message from browser');
//   };

//   socket.addEventListener('error', (event) => {
//     console.log('WebSocket error: ', event);
//   });
// };
