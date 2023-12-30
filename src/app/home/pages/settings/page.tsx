'use client'

// import { useState } from 'react';
// import { ActionIcon, Box, Button, Input, Paper, SimpleGrid, Textarea, useMantineTheme } from '@mantine/core';
// import { IconAdjustments } from '@tabler/icons-react';

// export default function page() {
//   const [boxes, setBoxes] = useState(['Box 1', 'Box 2', 'Box 3', 'Box 4']);

//   const moveBox = (index: number, direction: number) => {
//     const newBoxes = [...boxes];
//     const temp = newBoxes[index];
//     newBoxes[index] = newBoxes[index + direction];
//     newBoxes[index + direction] = temp;
//     setBoxes(newBoxes);
//   };

//   const addBox = (index: number) => {
//     const newBoxes = [...boxes];
//     newBoxes.splice(index + 1, 0, `Nuevo Box ${newBoxes.length + 1}`);
//     setBoxes(newBoxes);
//   };

//   const removeBox = (index: number) => {
//     const newBoxes = [...boxes];
//     newBoxes.splice(index, 1);
//     setBoxes(newBoxes);
//   };

//   const theme = useMantineTheme();
//   const borderColor = theme.colors.gray[4];

//   return (
//     <SimpleGrid cols={1} spacing="sm" verticalSpacing="sm" p={'sm'}>
//       <Box style={{ borderRadius: '5px', border: '1px solid', borderColor: borderColor }}>
//         <Paper p={2} withBorder style={{ height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Box>
//             <ActionIcon variant="filled" size="xs" mx="2px" aria-label="Settings">
//               <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
//             </ActionIcon>

//             <ActionIcon variant="filled" color='lime' size="xs" mx="2px" aria-label="Settings">
//               <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
//             </ActionIcon>
//           </Box>

//           <Box>
//             <ActionIcon variant="filled" size="xs" mx="2px" aria-label="Settings">
//               <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
//             </ActionIcon>

//             <ActionIcon variant="filled" color='lime' size="xs" mx="2px" aria-label="Settings">
//               <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
//             </ActionIcon>

//             <ActionIcon variant="filled" size="xs" mx="2px" aria-label="Settings">
//               <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
//             </ActionIcon>
//           </Box>
//         </Paper>

//         <Textarea m={'xs'}   
//         autosize  
//       placeholder="Input placeholder"
//     />

//       </Box>
//     </SimpleGrid>
//   );
// }


import { RichTextEditor, Link } from '@mantine/tiptap';
import { JSONContent, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useState } from 'react';
import { Textarea } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> </CH.Section> ## With multiple files  <CH.Section> ```js index.js const sit = ipsum - amet(dolor); ``` component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export default function page() {

  const profile = useSelector((state: RootState) => state.Profile.value)

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
      console.log(json);
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
    {JSON.stringify(profile)}
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
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

