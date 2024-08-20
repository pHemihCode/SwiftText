import React, {useCallback, useState} from 'react'
import {useDropzone, FileWithPath} from 'react-dropzone'
import FileImage from '../../assets/file-upload.svg'

type FileUploadProps={
    fieldChange: (FILE:File[]) => void;
    mediaUrl: string
}
const FileUploader = ({fieldChange, mediaUrl}: FileUploadProps) => {
    const [fileUrl, setFileUrl] = useState('')
    const [file, setFile] = useState<File[]>([])

      const handleFileSize =(file:File[])=>{
        if(file[0] !== undefined && file[0].size > 5000000){
          return (
            <div>
              <p className='text-red-600 text-sm'>File size is bigger than 5MB !</p>
            </div>
          )
        }
      }
    
    const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
        setFile(acceptedFiles),
        fieldChange(acceptedFiles),
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
      }, [file])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept:{
            'image/*':['.pdf', '.jpg', '.jpeg', '.svg']
        }
    })
  return (
    <div {...getRootProps()} className='flex flex-col w-full rounded-md bg-gray-900 cursor-pointer justify-center items-center'>
      <input {...getInputProps()} />
      {
        fileUrl ?
          (
            <div className='py-4 flex flex-col items-center gap-3'>
                <img src={fileUrl} alt="" className='w-full h-96 lg:h-[30rem] rounded-md' />
                {handleFileSize(file)}
            </div>
          ):
          (
            <div className='h-56 flex flex-col gap-3 items-center justify-center'>
                <img src={FileImage} alt="" width={97} height={77}/>
                <p className='text-sm font-medium text-gray-500'>SVG, JPEG, JPG, PDF</p>
                <button className='bg-blue-500 px-3 py-2 text-sm rounded-md'>Upload an Image</button>
            </div>
          )
      }
    </div>
  )
}

export default FileUploader