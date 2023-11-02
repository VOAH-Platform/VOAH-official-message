import { useAtom } from 'jotai';
import { Asterisk, Hexagon, Minus } from 'lucide-react';

import { priorityAtom } from '../Message/priorityAtom';

import { SelectMessageState, StateButton, Circle } from './style';

export function PrioritySelector() {
  const [priority, setPriority] = useAtom(priorityAtom);

  return (
    <SelectMessageState>
      <StateButton
        onClick={() => {
          setPriority(3);
        }}>
        <Circle style={{ background: priority === 3 ? '#f86060' : '#ffcaca' }}>
          <Asterisk color="white" size={20} />
        </Circle>
        <p
          style={{
            color: '$gray500',
            fontWeight: priority === 3 ? 'bold' : 'normal',
          }}>
          긴급
        </p>
      </StateButton>
      <StateButton
        onClick={() => {
          setPriority(2);
        }}>
        <Circle style={{ background: priority === 2 ? '#52c192' : '#cbeadb' }}>
          <Hexagon color="white" size={20} />
        </Circle>
        <p
          style={{
            color: '$gray500',
            fontWeight: priority === 2 ? 'bold' : 'normal',
          }}>
          중요
        </p>
      </StateButton>
      <StateButton
        onClick={() => {
          setPriority(1);
        }}>
        <Circle style={{ background: priority === 1 ? '#9099a6' : '#e2e7ec' }}>
          <Minus color="white" size={20} />
        </Circle>
        <p
          style={{
            color: '$gray500',
            fontWeight: priority === 1 ? 'bold' : 'normal',
          }}>
          일반 메시지
        </p>
      </StateButton>
    </SelectMessageState>
  );
}
