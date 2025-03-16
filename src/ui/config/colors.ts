enum colors {
  ui_10 = '#272421',
  ui_9 = '#242424',
  ui_8 = '#6a6a6a',
  ui_7 = '#afafaf',
  ui_6 = '#dadada',
  ui_5 = '#e4e4e4',
  ui_4 = '#e0e0e0',
  ui_3 = '#eaeaea',
  ui_2 = '#f0f0f0',
  ui_1 = '#ffffff',
  red_1 = '#ffc4c4',
  red_2 = '#f78b8b',
  red_3 = '#fa7373',
  red_4 = '#f76060',
  red_5 = '#E05235',
  red_6 = '#d42121',
  red_7 = '#a81616',
  red_8 = '#6e0909',
  blue_1 = '#edf9ff',
  blue_2 = '#d7f0ff',
  blue_3 = '#b9e7ff',
  blue_4 = '#88daff',
  blue_5 = '#50c3ff',
  blue_6 = '#28a5ff',
  blue_7 = '#0a84ff',
  blue_8 = '#007aff',
  blue_9 = '#0f58be',
  green_5 = '#5dd55d',
  yellow_5 = '#fce17d',
  yellow_6 = '#eec11eeb',
  primary = '#436126',
  background = '#F5F4F2',
  overlay = 'rgba(0, 0, 0, 0.4)'
}

export enum ui {
  fg = colors.ui_10,
  subtle = colors.ui_8,
  bg = colors.background,
  border = '#C9C8C5',
  required = colors.red_5,
  destructive = '#AF3931',
  yellow = '#CA8817'
}

export const FavoriteIconStyle = {
  FILLED: { fill: '#DE4439', stroke: '#DE4439' },
  OUTLINED: { fill: colors.ui_1, stroke: colors.ui_7 }
}

export default colors
