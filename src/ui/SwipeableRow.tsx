import React, { Component, PropsWithChildren } from 'react'
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native'

import { RectButton, Swipeable } from 'react-native-gesture-handler'

export type Action = {
  label: string
  color: string
  onPress: () => void
}

export default class AppleStyleSwipeableRow extends Component<
  PropsWithChildren<unknown> & {
    actions: Action[]
  }
> {
  private renderLeftActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: 'clamp'
    })
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }]
            }
          ]}
        >
          Archive
        </Animated.Text>
      </RectButton>
    )
  }

  private renderRightAction = (
    index: number,
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
    onPress: () => void
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    })

    const pressHandler = () => {
      this.close()
      onPress()
    }

    return (
      <Animated.View
        key={index}
        style={{ flex: 1, transform: [{ translateX: trans }] }}
      >
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    )
  }

  private renderRightActions =
    (actions: Action[]) =>
    (
      progress: Animated.AnimatedInterpolation<number>,
      _dragAnimatedValue: Animated.AnimatedInterpolation<number>
    ) =>
      (
        <View
          style={{
            width: actions.length * 82,
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
          }}
        >
          {actions.map((action, index) =>
            this.renderRightAction(
              index,
              action.label,
              action.color,
              64 * (index + 1),
              progress,
              action.onPress
            )
          )}
        </View>
      )

  private swipeableRow?: Swipeable

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref
  }
  private close = () => {
    this.swipeableRow?.close()
  }

  render() {
    const { children, actions } = this.props
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={this.renderRightActions(actions)}
      >
        {children}
      </Swipeable>
    )
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center'
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
