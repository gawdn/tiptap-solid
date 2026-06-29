import { Editor, type EditorOptions } from '@tiptap/core'
import { type Accessor, createSignal, onCleanup, onMount, getOwner, createRoot } from 'solid-js'
import { ReactiveOwnerProperty } from './ReactiveOwner.js'

export const createEditor = (options: Partial<EditorOptions>): Accessor<Editor | null> => {
  return createRoot(disposeRoot => {
    const [editor, setEditor] = createSignal<Editor | null>(null)

    const owner = getOwner()

    onMount(() => {
      const instance = new Editor({
        ...options,
        onBeforeCreate(props) {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          ;(props.editor as any)[ReactiveOwnerProperty] = owner
          options.onBeforeCreate?.(props)
        },
      })
      setEditor(instance)
    })

    onCleanup(() => {
      editor()?.destroy()
      disposeRoot()
    })

    return editor
  })
}
