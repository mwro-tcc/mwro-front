import { Routes } from '@api/mwro'
import CommunitiesMap from '@forms/Community/components/CommunitiesMap'
import useCollection from '@hooks/useCollection'
import { Community } from '@src/types/community'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'

export default function Main() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)

  const { data: communities = [] } = useCollection<Community>({
    url: Routes.Community.list
  })

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      return
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low
    })

    setLocation(location)
  }

  useEffect(() => {
    getLocationPermission()
  }, [])

  return (
    <>
      {location ? (
        <CommunitiesMap
          communities={communities}
          latitude={location.coords.latitude}
          longitude={location.coords.longitude}
          fullscreen
        />
      ) : (
        <></>
      )}
    </>
  )
}
