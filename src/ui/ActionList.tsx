import { FlatList, FlatListProps, StyleSheet } from 'react-native'
import ActionListItem from './ActionListItem'
import colors, { ui } from './config/colors'
import HStack from './HStack'
import VStack from './VStack'
import ListLabel from './ListLabel'
import AppleStyleSwipeableRow, { Action } from './SwipeableRow'
import { parse_style_shorthands } from './types/style_shorthands'

export type ActionType = {
  title?: string
  id?: string
  uuid?: string
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
  textSize?: number
  scrollEnabled?: boolean
}) {
  return (
    <VStack gap={8}>
      {!!props.label && <ListLabel>{props.label}</ListLabel>}
      <FlatList
        data={props.data}
        scrollEnabled={props.scrollEnabled ?? false}
        ItemSeparatorComponent={() => (
          <HStack
            border={[StyleSheet.hairlineWidth, 'solid', `${ui.border}c0`]}
            ml={16}
          />
        )}
        contentContainerStyle={{
          ...parse_style_shorthands({
            border: [StyleSheet.hairlineWidth, 'solid', ui.border]
          }),
          backgroundColor: colors.ui_1,
          borderRadius: 8,
          display: 'flex'
        }}
        keyExtractor={(item) => {
          return item[keyFrom] as string
        }}
        renderItem={({ item }) => (
          <AppleStyleSwipeableRow actions={swipeActions(item)}>
            <ActionListItem
              color={item.color}
              disabled={item.disabled}
              onPress={item.onPress}
              textSize={props.textSize}
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
