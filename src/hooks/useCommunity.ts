import { CommunityForm } from '../types/community'
import Lib from '../lib'
import Toast from '../lib/toast'
import { Community } from '@api/mwro'

const MOCKED_PRODUCT_LIST = [
  {
    id: 1,
    title: 'Sanduíche Natural',
    price: 'R$ 5,00',
    image:
      'https://img.freepik.com/free-photo/high-angle-sandwich-with-greens-tomatoes_23-2148893622.jpg'
  },
  {
    id: 2,
    title: 'Brownie',
    price: 'R$ 4,00',
    image:
      'https://s2-receitas.glbimg.com/yaRHKYhnNPkAZdN_4wk83Q9Y2VQ=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/y/H/ZSIYRzRsmXIb73mnAP0Q/brownie-de-chocolate.jpg'
  },
  {
    id: 3,
    title: 'Bolo no pote',
    price: 'R$ 4,00',
    image:
      'https://receitinhas.com.br/wp-content/uploads/2023/10/Bolo-no-pote-pra-vender-1200x1200.jpeg'
  },
  {
    id: 4,
    title: 'Wrap de frango',
    price: 'R$ 6,00',
    image:
      'https://www.perdigao.com.br/assets/_images/8402c5c5f29ca29d758ca7657d3c4ac29a587edf.webp'
  },
  {
    id: 5,
    title: 'Brigadeiro Gourmet',
    price: 'R$ 3,00',
    image:
      'https://panelaterapia.com/wp-content/uploads/2023/10/brigadeiro-gourmet.jpg'
  },
  {
    id: 6,
    title: 'Brigadeiro',
    price: 'R$ 2,00',
    image:
      'https://img.freepik.com/free-photo/vertical-selective-focus-shot-yummy-brigadeiroinkles_181624-59394.jpg'
  }
]

const MOCKED_STORE_LIST = [
  {
    id: 1,
    title: 'Loja do Douglas',
    image:
      'https://bsi.uniriotec.br/wp-content/uploads/sites/31/2020/05/douglas.jpg'
  },
  {
    id: 2,
    title: 'Marcinho',
    image:
      'https://media.gazetadopovo.com.br/2017/04/99d1a7137eec3842faf03a240889a173-gpMedium.jpg'
  }
]

export function useCommunity() {
  const list_user_communities = async () => {
    const res = Lib.error_callback(
      await Community.list_user_communities(),
      Toast.error
    )

    return res?.data
  }

  const create_community = async (data: CommunityForm) => {
    console.log(data)

    const res = Lib.error_callback(await Community.create(data), Toast.error)
    if (res) return res.data.community
  }

  const update_community = async (data: CommunityForm) => {
    const res = Lib.error_callback(await Community.update(data), Toast.error)
    if (res) return res.data.community
  }

  const get_community = async (id: string) => {
    return {
      name: 'Nome',
      description: 'Descrição',
      isPrivate: false,
      latitude: -22.967392367488312,
      longitude: -43.18354482530847
    }
  }

  const get_products = async (id: string) => {
    // TODO: add pagination
    return MOCKED_PRODUCT_LIST
    // const res = Lib.error_callback(await Community.get_products(id), console.error);
    // if (res) return res.data.products;
  }

  const get_stores = async (id: string) => {
    // TODO: add pagination
    return MOCKED_STORE_LIST
    // const res = Lib.error_callback(await Community.get_stores(id), console.error);
    // if (res) return res.data.stores;
  }

  return {
    list_user_communities,
    create_community,
    update_community,
    get_community,
    get_products,
    get_stores
  }
}
