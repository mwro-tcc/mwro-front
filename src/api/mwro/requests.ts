import Api from './api'
import Routes from './routes'

class Request {
  static async send_request(data: any) {
    return await Api.post(Routes.Requests.send_request, data)
  }

  static async get_received_requests() {
    return await Api.get(Routes.Requests.received_requests)
  }

  static async get_pending_requests() {
    return await Api.get(Routes.Requests.pending_requests)
  }

  static async update_request(requestId: any, data: any) {
    return await Api.put(
      Routes.Requests.process_request(requestId),
      data
    )
  }
}

export default Request
