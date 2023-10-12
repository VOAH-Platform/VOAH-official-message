import { Link } from 'react-router-dom';

import { NotFoundSubtitle, NotFoundTitle, NotFoundWrapper } from './style';

export function NotFoundPage() {
  return (
    <NotFoundWrapper>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle>Not Found</NotFoundSubtitle>
      <p>
        길을 잘못 든 것 같네요... <Link to="/">처음으로 돌아갈까요?</Link>
      </p>
    </NotFoundWrapper>
  );
}
