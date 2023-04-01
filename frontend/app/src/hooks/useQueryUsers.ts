import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useQueryUsers = () => {
  const router = useRouter()
  const getUser = async () => {
    const { data } = await axios.get<Omit<User, 'hassedpassword'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
    )
    return data
  }
  return useQuery<Omit<User, 'hassedpassword'>, Error>({
    queryKey: ['user'],
    queryFn: getUser,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })
}
