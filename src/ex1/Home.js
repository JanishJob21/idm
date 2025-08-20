import React from 'react';
import Content from './Content';
import List from './List';

const h = React.createElement;

export default function Home() {
  return h(React.Fragment, null, h(Content, null), h(List, null));
}
