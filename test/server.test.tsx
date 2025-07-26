import { describe, expect, it } from 'vitest'
import { isServer, renderToString } from 'solid-js/web'
import { EditorContent } from '../src'

describe('environment', () => {
  it('runs on server', () => {
    expect(typeof window).toBe('undefined')
    expect(isServer).toBe(true)
  })
})

describe('EditorContent', () => {
  it('renders the root component', () => {
    const string = renderToString(() => <EditorContent editor={null} />)
    expect(string).toBe('<div ></div>')
  })
})
