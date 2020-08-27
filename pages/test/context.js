import React, { createContext, useState, useRef, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'

const Cp = createContext()

export const Html = ({ className, children }) =>
  <div
    className={className}
    dangerouslySetInnerHTML={{ __html: children }}
  />

const Outer = ({ children }) => {
  const [store, setStore] = useState('')
  useEffect(() => {
    console.log('getting local storage')
    setStore(window.localStorage.getItem('store'))
  }, [])

  const handleChange = (e) => {
    console.log('input', e.target)
    setStore(e.target.value)
    window.localStorage.setItem('store', store)
  }
  return (
    <Cp.Provider value={store}>
      {children}
      <ContentEditable
        html={store} // innerHTML of the editable div
        onChange={handleChange} // handle innerHTML change
        tagName='article'
      />
    </Cp.Provider>
  )
}

const Consumer = ({ children }) =>
  <Cp.Consumer>
    {(stuff) => // render has to be a function
      <>
        <Html>{stuff}</Html>
      </>}
  </Cp.Consumer>

const Page = () =>
  <Outer>
    <section>
      <h1>Context usage</h1>
      <Consumer><p>Child of consumer </p></Consumer>
    </section>
  </Outer>

export default Page
