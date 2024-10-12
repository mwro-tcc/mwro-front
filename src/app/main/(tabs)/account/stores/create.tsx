import Form from '@forms/index'
import { router } from 'expo-router'

export default function CreateStore() {
  return <Form.Store onCancel={router.back} onFinish={router.back} />
}
