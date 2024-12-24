import Api from './api'
import Routes from './routes'
import { AxiosError } from 'axios'
import Toast from '@lib/toast'

class Request {
  static async send_request(data: any) {
    return await Api.post(Routes.Requests.send_request, data).catch(
      (error: AxiosError) => Toast.error(error?.message)
    )
  }

  static async get_received_requests() {
    return await Api.get(Routes.Requests.received_requests).catch(
      (error: AxiosError) => Toast.error(error?.message)
    )
  }

  static async get_pending_requests() {
    return await Api.get(Routes.Requests.pending_requests).catch(
      (error: AxiosError) => Toast.error(error?.message)
    )
  }

  static async update_request(requestId: any, data: any) {
    return await Api.put(
      Routes.Requests.process_request(requestId),
      data
    ).catch((error: AxiosError) => Toast.error(error?.message))
  }
}

export default Request
