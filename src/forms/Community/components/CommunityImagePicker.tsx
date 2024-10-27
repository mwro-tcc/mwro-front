import { Routes } from '@api/mwro'
import ImageUploader from '@api/mwro/image_uploader'
import useImagePicker from '@hooks/useImagePicker'
import { Community } from '@src/types/community'
import Button from '@ui/Button'
import HStack from '@ui/HStack'
import Image from '@ui/Image'
import colors from '@ui/config/colors'
import rounded from '@ui/config/rounded'

type Props = {
  community: Community
}

function CommunityImagePicker(props: Props) {
  const { community } = props

  const { image, pickImage, loading } = useImagePicker({
    initialImage: Routes.Image.src(community?.uuid),
    onPick: ImageUploader.createUploader(community?.uuid)
  })

  return (
    <HStack items='center' gap={15}>
      <Image
        loading={loading}
        src={image}
        hasAuthenticationHeaders
        w={75}
        h={75}
        bg={colors.blue_1}
        rounded={rounded.sm}
      />
      <Button variant='text' onPress={pickImage}>
        Selecionar...
      </Button>
    </HStack>
  )
}

export default CommunityImagePicker
