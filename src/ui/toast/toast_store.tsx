import { create } from 'zustand'
import { ToastTypes } from './types'
import _ from 'lodash'

type ToastStore = {
    toasts: { key: number; type: ToastTypes; message: string }[]
    success: (message: string) => void
    warning: (message: string) => void
    error: (message: string) => void
}

const show_toasts = _.curry(
    (
        set: (
            partial:
                | ToastStore
                | Partial<ToastStore>
                | ((state: ToastStore) => ToastStore | Partial<ToastStore>),
            replace?: boolean | undefined,
        ) => void,
        type: ToastTypes,
        message: string,
    ): void => {
        set(({ toasts }: ToastStore) => ({
            toasts: [
                ...toasts,
                { key: (_.last(toasts)?.key ?? 0) + 1, type, message },
            ],
        }))

        setTimeout(
            () => set(({ toasts }) => ({ toasts: _.drop(toasts) })),
            3000,
        )
    },
)

export default create<ToastStore>((set) => {
    const spawn = show_toasts(set)

    return {
        toasts: [],
        success: spawn('success'),
        warning: spawn('warning'),
        error: spawn('error'),
    }
})
