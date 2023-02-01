import { getBaseUrl } from "./get-base-url"
import { useHttp } from "./useHttp"


export const useCollection = (collectionName: string) => {
  const base = getBaseUrl()
  const { post } = useHttp()

  const insertOne = async (document: object): Promise<any> => {
    return post('data-api', {
      action: 'insertOne',
      collection: collectionName,
      document: document
    })
  }

  const findOne = async (query: object): Promise<any> => {
    const response = await post('data-api',{
      action: 'findOne',
      collection: collectionName,
      filter: query
    })

    return response?.document
  }

  const find = async (query: object): Promise<any> => {
    const response = await post('data-api',{
      action: 'find',
      collection: collectionName,
      filter: query
    })

    return response?.documents
  }

  return {
    insertOne,
    findOne,
    find
  } as const
}
