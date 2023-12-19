'use client'
import { MDXProvider } from '@mdx-js/react'
import Post from '../page.mdx'
import { JSX, ClassAttributes, HTMLAttributes } from 'react'

/** @type {import('mdx/types.js').MDXComponents} */
const components = {
   em(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) {
      return <i {...props} />
   }
}

import React from 'react'

export default function page() {
   return (
      <MDXProvider components={components}>
         <Post />
      </MDXProvider>
   )
}








