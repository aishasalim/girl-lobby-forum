import React, { useState } from 'react'
import './App.css'
import GalleryPostDetail from './components/GalleryPostDetail'

function App() {
  const [searchQuery] = useState('')

  return (
    <>
      <GalleryPostDetail searchQuery={searchQuery} />
    </>
  )
}

export default App
