import Store from '@api/mwro/store'
import Lib from '../lib'
import Toast from '../lib/toast'
import { StoreForm } from '@src/types/store'

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

export function useStore() {
  const create_store = async (data: StoreForm) => {
    const res = Lib.error_callback(await Store.create(data), Toast.error)
    if (res) return res
  }

  const update_store = async (data: StoreForm) => {
    const res = Lib.error_callback(await Store.update(data), Toast.error)
    if (res) return res.data.store
  }

  const list_user = async () => {
    const res = Lib.error_callback(await Store.list_user_stores(), Toast.error)
    if (res) return res
  }

  const get_products = async (id: string) => {
    // TODO: add pagination
    return MOCKED_PRODUCT_LIST
    // const res = Lib.error_callback(await Store.get_products(id), console.error);
    // if (res) return res.data.products;
  }

  const delete_store = async (id: string) => {
    const res = Lib.error_callback(await Store.delete(id), console.error)
    if (res) return res
  }

  return {
    create_store,
    update_store,
    list_user,
    get_products,
    delete_store
  }
}
