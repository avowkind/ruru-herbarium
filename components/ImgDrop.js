import Dropzone from 'react-dropzone-uploader'
/**
// import 'react-dropzone-uploader/dist/styles.css'
**/

const ImgDrop = ({ collection, _id, onChange }) => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    console.log('getUploadParams', meta)
    return {
      url: '/api/picture',
      fields: { collection, _id }
    }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file)
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
    onChange()
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent='Drop an image'
      accept='image/*,audio/*,video/*'
    />
  )
}
export default ImgDrop
