import React from 'react'

import axios from "axios";
import httpClient from '../helper/httpClient';

interface BlogItem {
  fields: {
    title: string;
    alias: string
  }
}
const Server = (props: any) => {
  const blog = props.data.items as BlogItem[];

  function onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      // console.log(img);
      // console.log(img.name);
      // console.log(URL.createObjectURL(img));

      const params = new URLSearchParams();
      params.append('url', URL.createObjectURL(img));
      params.append('title', img.name);
      httpClient
        .post("/media", params)
        .then((res) => {
          console.log('finished', res);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  return (
    <>
      <h1>Select Image</h1>
      <input type="file" name="myImage" onChange={onImageChange}  />
      <h2>List Image</h2>
      <ul className="server-list">
        {blog && blog.length > 0 && (
          <>
            {blog.map(item => {
              return <li key={item.fields.alias}>{item.fields.title}</li>
            })}
          </>
        )}
      </ul>
    </>
  )
}

export async function getServerSideProps() {
  console.log('getServerSideProps')
  const data = await axios.get('https://cdn.contentful.com/spaces/jpl2kwkwgmlb/environments/master/entries?content_type=blog&access_token=OkqBYBhvvxq0Q7fctCSozAVfrbBCtbIiCtxFefxUHa0');
  return {
    props: {
      data: data.data
    }, // will be passed to the page component as props
  }
}

export default Server
