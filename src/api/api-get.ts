import axios, { type AxiosResponse, AxiosError } from 'axios'
import { URL, API_KEY } from '@/constants/enum'
import { type CongressMan } from '@/api/CongressMan'

// 제네릭 타입을 사용하여 다양한 데이터 타입 지원
interface ApiResponse<T> {
  data: T
  status: number
}

// API 호출 함수
async function fetchData<T>(url: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.get(
      `${URL.OPENAPI_BASE_URL}${url}?KEY=${API_KEY.ASSEMBLY}&TYPE=json&pSize=300`,
      {
        params, // URL 쿼리 파라미터 옵션
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return {
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    // 에러 처리
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      console.error('API 호출 중 에러 발생:', axiosError.message)

      throw new Error(`API 호출 실패: ${axiosError.message}`)
    } else {
      console.error('예상치 못한 에러:', error)
      throw error
    }
  }
}

// 사용 예제
async function getUserData() {
  try {
    const result = await fetchData<CongressMan>(URL.KEY_RETRIEVE_PEOPLE)
    console.log('사용자 데이터:', result.data)
    return result.data[URL.KEY_RETRIEVE_PEOPLE][1].row
  } catch (error) {
    console.error('데이터 가져오기 실패', error)
    return []
  }
}

export { fetchData, getUserData }
