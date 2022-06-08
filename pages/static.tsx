import React from 'react'
import axios from "axios";

interface BlogItem {
  fields: {
    title: string;
    alias: string
  }
}

const Static = (props: any) => {
  const blog = props.data.items as BlogItem[];
  return (
    <ul className="static-list">
      {blog && blog.length > 0 && (
        <>
          {blog.map(item => {
            return <li key={item.fields.alias}>{item.fields.title}</li>
          })}
        </>
      )}
    </ul>
  )
}

export async function getStaticProps() {
  console.log('getStaticProps')
  const data = await axios.get('https://cdn.contentful.com/spaces/jpl2kwkwgmlb/environments/master/entries?content_type=blog&access_token=OkqBYBhvvxq0Q7fctCSozAVfrbBCtbIiCtxFefxUHa0');
  return {
    props: {
      data: data.data
    }, // will be passed to the page component as props
    revalidate: 20,
  }
}

export default Static