"use client"
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useState } from 'react';
import { Textarea } from '@mantine/core';
import Toolbar from './toolbar';
import EditorImage from './image';
import EditorVideo from './video';


const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> </CH.Section> ## With multiple files  <CH.Section> ```js index.js const sit = ipsum - amet(dolor); ``` component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export default function page() {

  const [value, setValue] = useState<string>('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  function getValue() {
    if (editor) {
      const json = editor.getJSON()
      const html = editor.getHTML()
      setValue(convertToMarkdown(json))     
    }
  }

  interface Mark {
    type: string;
    attrs?: Record<string, any>;
  }
  
  interface ContentBlock {
    type?: string;
    attrs?: Record<string, any>;
    content?: ContentBlock[];
    marks?: Mark[];
    text?: string;
  }
  
  function convertToMarkdown(json: ContentBlock): string {
    let markdown = '';
  
    json.content?.forEach(block => {
      switch (block.type) {
        case 'heading':
          markdown += '#'.repeat(block.attrs?.level as number) + ' ' + block.content![0].text + '\n\n';
          break;
  
        case 'paragraph':
          block.content!.forEach(content => {
            if (content.marks) {
              content.marks.forEach(mark => {
                if (mark.type === 'code') {
                  markdown += '`' + content.text! + '` ';  
                } else if (mark.type === 'link') {
                  markdown += '[' + content.text! + '](link) ';
                } 
              });
            } else {
              markdown += content.text! + ' ';
            }
          });
          
          markdown += '\n\n';
          break;
  
        case 'bulletList':
          // código para lista
          
          break;
  
        default:
          console.warn('Tipo de bloque no soportado: ' + block.type);
          break;
      }
    });
  
    return markdown;
  }

  return (
    <>
    <EditorImage/>
    <EditorVideo/>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />           
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <button onClick={getValue}>getValue</button>
      <Textarea
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
        autosize={true}
        value={value}
      />
      
    </>

  );
}
