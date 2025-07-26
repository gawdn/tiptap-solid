import { createRoot, Show } from 'solid-js'
import { isServer } from 'solid-js/web'
import { createEditor, EditorContent } from '../src'
import { describe, expect, it, vi } from 'vitest'
import { BubbleMenu } from '../src/BubbleMenu'
import { StarterKit } from '@tiptap/starter-kit'
import { FloatingMenu } from '../src/FloatingMenu'

describe('environment', () => {
  it('runs on client', () => {
    expect(typeof window).toBe('object')
    expect(isServer).toBe(false)
  })
})

describe('EditorContent', () => {
  it('renders the root component', () => {
    createRoot(() => {
      const container = (<EditorContent editor={null} />) as HTMLDivElement
      expect(container.outerHTML).toBe('<div></div>')
    })
  })
})

describe('BubbleMenu', () => {
  it('renders a bubble menu component', async () => {
    createRoot(async () => {
      const editor = createEditor({
        extensions: [StarterKit],
      })
      await vi.waitFor(() => new Promise<void>((res, rej) => (editor() != null ? res() : rej())))
      const container = (
        <EditorContent editor={editor()}>
          <BubbleMenu editor={editor()!} class="test" />
        </EditorContent>
      ) as HTMLDivElement
      expect(container.outerHTML).toBe('<div><div class="test"></div></div>')
    })
  })
})

describe('FloatingMenu', () => {
  it('renders a floating menu component', async () => {
    createRoot(async () => {
      const editor = createEditor({
        extensions: [StarterKit],
      })
      await vi.waitFor(() => new Promise<void>((res, rej) => (editor() != null ? res() : rej())))
      const container = (
        <EditorContent editor={editor()}>
          <FloatingMenu editor={editor()!} class={'test'} />
        </EditorContent>
      ) as HTMLDivElement
      expect(container.outerHTML).toBe('<div><div class="test"></div></div>')
    })
  })
})
