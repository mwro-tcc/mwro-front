import createConsoleErrorHandler from '@lib/create_console_error_handler';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import useBoolean from './useBoolean';

type Options = {
  debug?: boolean
  initialImage?: string | null
  aspectRatio?: [number, number]
  onPick?: (image: ImagePicker.ImagePickerAsset) => Promise<any>
}

const ERROR_MESSAGE = 'Erro ao selecionar a imagem'
const DEFAULT_ASPECT_RATIO: [number, number] = [1, 1]
const DEFAULT_CONFIG: ImagePicker.ImagePickerOptions = {
  allowsEditing: true,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 0.3,
  base64: true,
}

function useImagePicker(options?: Options): {
  image: string | null,
  pickImage: () => void,
  loading: boolean
} {
  const { value: loading, setTrue: setLoadingTrue, setFalse: setLoadingFalse } = useBoolean(false)
  const [image, setImage] = useState<string | null>(options?.initialImage ?? null)

  const onPick = options?.onPick

  const handlePickImage = (result: ImagePicker.ImagePickerResult) => {
    const imageSource = result.assets?.at(0)?.uri

    if (!imageSource || !result.assets?.at(0)) return createConsoleErrorHandler(ERROR_MESSAGE)

    if (!onPick) return setImage(imageSource)

    setLoadingTrue()
    onPick(result.assets.at(0) as ImagePicker.ImagePickerAsset)
      .then(() => setImage(imageSource))
      .finally(setLoadingFalse)
  }

  const pickImage = () => {
    const config = {
      ...DEFAULT_CONFIG,
      aspect: options?.aspectRatio ?? DEFAULT_ASPECT_RATIO,
    }

    ImagePicker
      .launchImageLibraryAsync(config)
      .then(handlePickImage)
      .catch(createConsoleErrorHandler(ERROR_MESSAGE))
  }

  if (options?.debug) console.log(image)

  return { image, pickImage, loading }
}

export default useImagePicker