import { FlatList, FlatListProps } from 'react-native'
import ActionListItem from './ActionListItem'
import colors from './config/colors'
import HStack from './HStack'
import VStack from './VStack'
import ListLabel from './ListLabel'
import AppleStyleSwipeableRow, { Action } from './SwipeableRow'

export type ActionType = {
  title: string
  id?: string
  icon?: string
  color?: string
  disabled?: boolean
  onPress?: () => void
}

export type ActionListSwipeAction = (item: ActionType) => Action[]

function ActionList({
  swipeActions = () => [],
  keyFrom = 'title',
  ...props
}: Partial<FlatListProps<ActionType>> & {
  keyFrom?: keyof ActionType
  swipeActions?: ActionListSwipeAction
  label?: string
}) {
  return (
    <VStack gap={8}>
      {!!props.label && <ListLabel>{props.label}</ListLabel>}
      <FlatList
        data={props.data}
        scrollEnabled={false}
        ItemSeparatorComponent={() => (
          <HStack border={[0.3, 'solid', colors.ui_3]} ml={16} />
        )}
        contentContainerStyle={{
          backgroundColor: colors.ui_1,
          borderRadius: 8,
          display: 'flex'
        }}
        keyExtractor={(item) => item[keyFrom] as string}
        renderItem={({ item }) => (
          <AppleStyleSwipeableRow actions={swipeActions(item)}>
            <ActionListItem
              color={item.color}
              disabled={item.disabled}
              onPress={item.onPress}
            >
              {item.title}
            </ActionListItem>
          </AppleStyleSwipeableRow>
        )}
        {...props}
      />
    </VStack>
  )
}

export default ActionList
