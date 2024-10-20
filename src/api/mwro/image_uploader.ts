import createConsoleErrorHandler from "@lib/create_console_error_handler";
import Api from "./api";
import Routes from "./routes";
import { deeplog } from "@lib/deeplog";

enum ImageUploaderError {
  LOAD_FILE = 'Erro ao carregar a imagem para realizar o upload',
  LOAD_BLOB = 'Erro ao carregar o blob da imagem para realizar o upload',
  API = 'Erro na requisição'
}

const IMAGE_UPLOADER_CONFIG = {
  headers: {
    'Content-Type': `multipart/form-data`,
  }
}

function createFormData(blob: Blob, fileName: string) {
  let form = new FormData();
  form.append('image', new File([blob], fileName), fileName);
  return form
}

function createFileName(assetId: string, localSource: string) {
  const fileExtension = localSource.split('.').pop()
  return `${assetId}.${fileExtension}`
}

class ImageUploader {
  static async upload(assetId: string, localSource: string) {
    const file =
      await fetch(localSource)
        .catch(createConsoleErrorHandler(ImageUploaderError.LOAD_FILE))

    if (!file) return

    const blob =
      await file.blob()
        .catch(createConsoleErrorHandler(ImageUploaderError.LOAD_BLOB))

    if (!blob) return

    const form =
      createFormData(blob, createFileName(assetId, localSource))

    Api.post(
      Routes.Image.create(assetId),
      form,
      IMAGE_UPLOADER_CONFIG
    ).catch(createConsoleErrorHandler(ImageUploaderError.API))
  }
  static createUploader(assetId: string) {
    return (localSource: string) => ImageUploader.upload(assetId, localSource)
  }
}

export default ImageUploader