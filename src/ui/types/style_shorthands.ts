import _ from 'lodash';
import {
    ColorValue,
    DimensionValue,
    FlexAlignType,
    TextStyle,
    ViewStyle,
} from 'react-native'

type Items = 'center' | 'end' | 'start' | 'baseline' | 'stretch' | 'nil'
type Justify =
    | 'center'
    | 'end'
    | 'start'
    | 'between'
    | 'around'
    | 'around'
    | 'evenly'
    | 'nil'

const items = {
    center: 'center',
    end: 'flex-end',
    start: 'flex-start',
    baseline: 'baseline',
    stretch: 'stretch',
    nil: undefined,
} as Record<Items, FlexAlignType | undefined>

const justify = {
    center: 'center',
    end: 'flex-end',
    start: 'flex-start',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
    nil: undefined,
} as Record<
    Justify,
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined
>

export type FontWeight =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined

type BorderStyle = 'solid' | 'dashed' | 'dotted'

type Border =
    | [color: ColorValue]
    | [width: number, color: ColorValue]
    | [width: number, style: BorderStyle, color: ColorValue]

export type StyleShorthands = Partial<{
    flex: number
    gap: number
    p: number
    px: number
    py: number
    pt: number
    pr: number
    pl: number
    pb: number
    m: number
    mx: number
    my: number
    mt: number | `${number}%`
    mr: number
    ml: number
    mb: number
    items: Items
    justify: Justify
    size: number
    absolute: boolean
    t: number
    r: number
    l: number
    b: number
    bg: string
    w: DimensionValue | undefined
    h: DimensionValue | undefined
    z: number
    rounded: number
    border: Border
    shadow: [
        x: number,
        y: number,
        blur: number,
        color: ColorValue,
        opacity: number,
    ]
}>

export type TextShorthands = Partial<{
    size: number
    weight: FontWeight
    color: string
}>

const get_border_color = (
    border: Border | undefined,
): ColorValue | undefined => {
    switch (border?.length) {
        case 3:
            return border?.[2]
        case 2:
            return border?.[1]
        case 1:
            return border?.[0]
        default:
            return undefined
    }
}

const get_border_style = (
    border: Border | undefined,
): BorderStyle | undefined => {
    if (_.isNil(border)) return undefined
    return border?.length === 3 ? border?.[1] : 'solid'
}

const get_border_width = (border: Border | undefined): number | undefined => {
    if (_.isNil(border)) return undefined
    return border?.length === 1 ? 1 : border?.[0]
}

export const parse_style_shorthands = (
    shorthands: StyleShorthands,
): ViewStyle | TextStyle => ({
    flex: shorthands?.flex,
    gap: shorthands?.gap,
    padding: shorthands?.p,
    paddingHorizontal: shorthands?.px,
    paddingVertical: shorthands?.py,
    paddingTop: shorthands?.pt,
    paddingRight: shorthands?.pr,
    paddingLeft: shorthands?.pl,
    paddingBottom: shorthands?.pb,
    margin: shorthands?.m,
    marginHorizontal: shorthands?.mx,
    marginVertical: shorthands?.my,
    marginTop: shorthands?.mt,
    marginBottom: shorthands?.mb,
    marginRight: shorthands?.mr,
    marginLeft: shorthands?.ml,
    alignItems: items?.[shorthands?.items ?? 'nil'],
    justifyContent: justify?.[shorthands?.justify ?? 'nil'],
    ...(shorthands?.absolute ? { position: 'absolute' } : {}),
    top: shorthands?.t,
    bottom: shorthands?.b,
    right: shorthands?.r,
    left: shorthands?.l,
    backgroundColor: shorthands?.bg,
    width: shorthands?.w,
    height: shorthands?.h,
    zIndex: shorthands?.z,
    borderRadius: shorthands?.rounded,
    borderColor: get_border_color(shorthands?.border),
    borderStyle: get_border_style(shorthands?.border),
    borderWidth: get_border_width(shorthands?.border),
    fontSize: shorthands.size,
    shadowOffset: _.isNil(shorthands?.shadow)
        ? undefined
        : {
            width: shorthands?.shadow?.[0],
            height: shorthands?.shadow?.[1],
        },
    shadowRadius: shorthands?.shadow?.[2],
    shadowColor: shorthands?.shadow?.[3],
    shadowOpacity: shorthands?.shadow?.[4],
})

export const parse_text_style_shorthands = (
    shorthands: TextShorthands,
): TextStyle => ({
    fontSize: shorthands.size,
    fontWeight: shorthands.weight,
    color: shorthands.color,
})
