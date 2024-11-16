import { Routes } from '@api/mwro'
import Store from '@api/mwro/store'
import useCollection from '@hooks/useCollection'
import { Store as StoreType } from '@src/types/store'
import ActionList, { ActionType } from '@ui/ActionList'
import React from 'react'
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const AddStoreModal = ({
  modalVisible,
  setModalVisible,
  communityUuid
}: any) => {
  const { data: stores = [] } = useCollection<StoreType>({
    url: Routes.Store.list_user_stores,
    keys: [Store.COLLECTION_KEY]
  })

  const handleUpdate = async (store: StoreType) => {
    await Store.update({ ...store, communityUuid: communityUuid })
    setModalVisible(!modalVisible)
  }

  const data: ActionType[] = stores.map((item) => ({
    id: item.uuid,
    title: item.name,
    onPress: () => handleUpdate(item)
  }))

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Adicionar Loja</Text>
            <Text>
              <ActionList
                data={data}
                keyFrom='id'
                textSize={14}
                scrollEnabled={true}
              />
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60%',
    maxHeight: 300,
    overflow: 'hidden'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 30,
    paddingBottom: 80,
    borderRadius: 20,
    width: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 10
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default AddStoreModal
