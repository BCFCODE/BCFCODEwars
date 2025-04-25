import { useQuery } from '@tanstack/react-query'


const useCodewarsQuery = () => {
  return useQuery({
    queryKey: ['codewars'],

  })
  
}

export default useCodewarsQuery