import createConsoleErrorHandler from '@lib/create_console_error_handler';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

type Options = {
  debug?: boolean
  initialImage?: string
  aspectRatio?: [number, number]
  onPick?: (imageSource: string) => void
}

const ERROR_MESSAGE = 'Erro ao selecionar a imagem'
const DEFAULT_ASPECT_RATIO: [number, number] = [1, 1]
const DEFAULT_CONFIG = {
  allowsEditing: true,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 1,
}

function useImagePicker(options?: Options): [string | null, Function] {
  const [image, setImage] = useState<string | null>(options?.initialImage ?? null)

  const handlePickImage = (result: ImagePicker.ImagePickerResult) => {
    const imageSource = result.assets?.at(0)?.uri

    if (!imageSource) return createConsoleErrorHandler(ERROR_MESSAGE)

    options?.onPick?.(imageSource)
    setImage(imageSource)
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

  return [image, pickImage]
}

export default useImagePicker