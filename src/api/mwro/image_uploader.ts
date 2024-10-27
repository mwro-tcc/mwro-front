import createConsoleErrorHandler from "@lib/create_console_error_handler";
import Api from "./api";
import Routes from "./routes";
import { ImagePickerAsset } from "expo-image-picker";

enum ImageUploaderError {
  LOAD_FILE = 'Erro ao carregar a imagem para realizar o upload',
  LOAD_BLOB = 'Erro ao carregar o blob da imagem para realizar o upload',
  API = 'Erro na requisição'
}

class ImageUploader {
  static async upload(assetId: string, image: ImagePickerAsset) {
    const form = new FormData();
    const fileExtension = image.uri.split('.').pop()
    const data = { uri: image.uri, name: 'media', type: `image/${fileExtension}` } as any
    form.append('image', data);

    return Api.post(
      Routes.Image.create(assetId),
      form,
    ).catch(createConsoleErrorHandler(ImageUploaderError.API))
  }
  static createUploader(assetId?: string) {
    if (!assetId) return undefined
    return (image: ImagePickerAsset) => ImageUploader.upload(assetId, image)
  }
}

export default ImageUploader