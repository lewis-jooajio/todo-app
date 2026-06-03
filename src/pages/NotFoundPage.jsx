import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div>
      <h2>404 - 페이지를 찾을 수 없습니다</h2>
      <p>존재하지 않는 주소입니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  )
}

export default NotFoundPage
