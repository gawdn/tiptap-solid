import { createRoot, JSX, Show } from 'solid-js'
import { isServer } from 'solid-js/web'
import { createEditor, EditorContent } from '../src/index.jsx'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BubbleMenu } from '../src/BubbleMenu.jsx'
import { StarterKit } from '@tiptap/starter-kit'
import { FloatingMenu } from '../src/FloatingMenu.jsx'
import { render } from 'solid-js/web'

import { cleanup } from '@solidjs/testing-library'

afterEach(() => {
  cleanup()
})

function mount(ui: () => JSX.Element) {
  const container = document.createElement('div')
  render(ui, container)
  return container
}

describe('environment', () => {
  it('runs on client', () => {
    expect(typeof window).toBe('object')
    expect(isServer).toBe(false)
  })
})

describe('EditorContent', () => {
  it('renders root component', () => {
    const container = mount(() => <EditorContent editor={null} />)

    expect(container.innerHTML).toBe('<div></div>')
  })
})

describe('BubbleMenu', () => {
  it('renders bubble menu component', async () => {
    const editor = createEditor({
      extensions: [StarterKit],
    })

    await vi.waitFor(() => {
      if (!editor()) throw new Error('not ready')
    })

    const container = mount(() => (
      <EditorContent editor={editor()}>
        <BubbleMenu editor={editor()!} class="test" />
      </EditorContent>
    ))

    const prose = container.querySelector('.ProseMirror')
    const menu = container.querySelector('.test')

    expect(prose).toBeTruthy()
    expect(menu).toBeTruthy()
  })
})

describe('FloatingMenu', () => {
  it('renders floating menu component', async () => {
    const editor = createEditor({
      extensions: [StarterKit],
    })

    await vi.waitFor(() => {
      if (!editor()) throw new Error('not ready')
    })

    const container = mount(() => (
      <EditorContent editor={editor()}>
        <FloatingMenu editor={editor()!} class="test" />
      </EditorContent>
    ))

    const prose = container.querySelector('.ProseMirror')
    const menu = container.querySelector('.test')

    expect(prose).toBeTruthy()
    expect(menu).toBeTruthy()
  })
})
