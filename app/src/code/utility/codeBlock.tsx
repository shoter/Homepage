import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';

// https://github.com/rexxars/react-markdown/blob/master/src/renderers.js

export interface CodeBlockProps {
  language?: string,
  value: string
};


export default class CodeBlock extends React.PureComponent<CodeBlockProps> {
  static defaultProps = {
    language: null,
  }

  render() {
    const { language, value } = this.props;

    return (
      <SyntaxHighlighter language={language}>
        {value}
      </SyntaxHighlighter>
    );
  }
}