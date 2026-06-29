import type { Editor } from '@tiptap/core'
import {
  type Component,
  type ComponentProps,
  createEffect,
  createSignal,
  onCleanup,
  splitProps,
} from 'solid-js'
export interface EditorContentProps extends ComponentProps<'div'> {
  editor: Editor | null
}

function mountEditor(editor: Editor | null, targetRef: HTMLElement) {
  if (editor?.options.element) {
    const element = editor.options.element
    if (element instanceof Element) {
      targetRef.append(...element.childNodes)
    } else if (typeof element === 'object') {
      targetRef.append(...element.mount.childNodes)
    } else {
      element(targetRef)
    }
    editor.setOptions({
      element: targetRef,
    })
    editor.createNodeViews()
    return true
  }
  return false
}

export const EditorContent: Component<EditorContentProps> = props => {
  const [local, rest] = splitProps(props, ['editor'])
  const [editorContentRef, setEditorContentRef] = createSignal<HTMLDivElement>()
  let mounted = false
  createEffect(() => {
    const { editor } = local
    const ref = editorContentRef()
    if (mounted || ref == null) return
    const didMount = mountEditor(editor, ref)
    mounted = didMount
  })
  onCleanup(() => {
    const { editor } = local
    if (!editor) {
      return
    }
    if (!editor.isDestroyed) {
      editor.view.setProps({
        nodeViews: {},
      })
      editor.unmount()
    }
  })

  return <div ref={e => setEditorContentRef(e)} {...rest} />
}
