import React, { FunctionComponent, useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useApp } from '../providers/AppProvider'
import { VOID_JWT } from '../websockets'

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
)

const FilePond_js: FunctionComponent = () => {
  const { jwt } = useApp()
  const [files, setFiles] = useState([])
  const jsx = () => {
    if (jwt === VOID_JWT) {
      return <div>Must be logged in...</div>
    }
    return (
      <FilePond
        files={files}
        allowMultiple
        onupdatefiles={setFiles}
        onpreparefile={file => console.log('Preparing file ', file.filename)}
        onprocessfileprogress={e => console.log(e.filename)}
        oninit={() => {
          console.log('Init FilePond')
        }}
        onaddfilestart={e => console.log('Adding file ', e.filename)}
        onprocessfilestart={e => console.log('Process file start ', e.filename)}
        labelIdle="Drag & Drop Your Files"
        server={{
          url: 'https://demo2.kathyebel.dev:1200',
          process: {
            url: '/rest/upload',
            method: 'POST',
            headers: { Authorization: `Bearer ${jwt}` },
            timeout: 7000
          }
        }}
      />
    )
  }
  return jsx()
}

export default FilePond_js
