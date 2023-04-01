import { useQueryUsers } from '@/hooks/useQueryUsers'
import { Loader } from '@mantine/core'

export const UserInfo: React.FC = () => {
  const { data: user, status } = useQueryUsers()
  if (status === 'loading') return <Loader />
  return <div>{user?.email}</div>
}
