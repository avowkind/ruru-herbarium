export const Tag = ({children}) => 
  <span className='bg-orange-200 text-blue-800 px-3 m-1 rounded-md'>{children}</span>


export const Tags = ({ tags }) => {
  if (!tags || tags.length === 0 ) return ''
  return (
  <div className= 'my-4 flex flex-row flex-wrap'>
    {tags.map( (tag, index) => {
      return (
        <Tag key={index}>{tag}</Tag>
      )
    })}
  </div>
  )
}

export default Tags