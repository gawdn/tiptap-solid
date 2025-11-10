import { Editor } from '@tiptap/core'
import { Component, createRoot } from 'solid-js'
import { render } from 'solid-js/web'
import { getTiptapSolidReactiveOwner } from './ReactiveOwner'
import { createStore } from 'solid-js/store'

export interface SolidRendererOptions<P = any> {
  editor: Editor
  props?: P
  as?: keyof HTMLElementTagNameMap
  className?: string
}

/**
 * SolidRenderer: mounts a Solid component inside a Tiptap 3 NodeView or floating element.
 * Fully reactive: updates trigger rerender, cleanup happens automatically on editor disposal.
 */
export class SolidRenderer<P extends Record<string, any> = Record<string, any>> {
  id: string
  editor: Editor
  element: HTMLElement
  dispose!: () => void
  private setProps!: (props: Partial<P>) => void

  constructor(
    component: Component<P>,
    { editor, props, as = 'div', className = '' }: SolidRendererOptions<P>,
  ) {
    this.id = Math.floor(Math.random() * 0xffffffff).toString()
    this.editor = editor
    this.element = document.createElement(as)
    this.element.classList.add('solid-renderer')
    if (className) this.element.classList.add(...className.split(' '))

    // Use the editor's reactive owner so cleanup is automatic
    const owner = getTiptapSolidReactiveOwner(this.editor)

    createRoot(dispose => {
      this.dispose = dispose

      // Local store for reactive props inside the Solid root
      const [store, setStore] = createStore<P>(props ?? ({} as P))
      this.setProps = (newProps: Partial<P>) => setStore((prev: any) => ({ ...prev, ...newProps }))

      // Render the component directly into the container
      render(() => component(store as P), this.element)
    }, owner)
  }

  /**
   * Update props reactively.
   * Will trigger the Solid component to rerender.
   */
  updateProps(newProps: Partial<P>) {
    this.setProps(newProps)
  }

  /**
   * Cleanup Solid root and DOM element.
   */
  destroy() {
    this.dispose()
    this.element.remove()
  }
}
