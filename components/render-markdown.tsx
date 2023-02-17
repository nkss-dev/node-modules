'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';

export default function RenderMarkdown(props: MDXRemoteProps) {
  return <MDXRemote {...props} />;
}
