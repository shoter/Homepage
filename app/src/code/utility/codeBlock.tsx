import React from 'react';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";

// https://github.com/rexxars/react-markdown/blob/master/src/renderers.js

export interface CodeBlockProps {
  language?: string,
  value: string
};

export const CodeBlock = {
  code({node , inline, className, children, ...props} : CodeProps) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        {...props}
        children={String(children).replace(/\n$/, '')}
        style={vs}
        language={match[1]}
        PreTag="div"
      />
    ) : (
      <code {...props} className={className}>
        {children}
      </code>
    )
  }
}