"use client"
import '@mdxeditor/editor/style.css'
import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'


import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { tablePlugin } from '@mdxeditor/editor/plugins/table'
import { InsertTable, linkPlugin, CreateLink, linkDialogPlugin, imagePlugin, InsertImage, Button, BlockTypeSelect, headingsPlugin, listsPlugin, ListsToggle, Select } from '@mdxeditor/editor'
import { useRef, useState } from 'react'
import { Box, Paper, Textarea } from '@mantine/core'

const MyCustomButton = () => {
    const handleClick = () => {
        console.log('Mi botón personalizado fue presionado');
    };

    return (
        <Select value={''} onChange={function (value: string): void {
            console.log(value);

        }} triggerTitle={''} placeholder={''} items={[{ label: 'uno', value: "uno" }, { label: 'dos', value: "dos" }]} >

        </Select>
    );
};

function App() {
    const [markdown, setMarkdown] = useState('# Hello World');

    const editorRef = useRef<any>();

    const handleButtonClick = () => {
        const markdown = editorRef.current.getMarkdown();
        setMarkdown(markdown)
        console.log(markdown);
    };
    return (
        <>
        <Box p={'md'}>
            <Paper  withBorder>
                
                <MDXEditor markdown='Hello world'
                    ref={editorRef}
                    // onChange={(newMarkdown) => {
                    //     setMarkdown(newMarkdown);
                    //     console.log(newMarkdown); // Aquí puedes manejar el nuevo markdown
                    //   }}
                    plugins={[
                        headingsPlugin(),
                        linkPlugin(),
                        tablePlugin(),
                        linkDialogPlugin(),
                        // imagePlugin(), 
                        listsPlugin(),
                        toolbarPlugin({
                            toolbarContents: () => (
                                <>
                                    {/* <UndoRedo /> */}
                                    <BlockTypeSelect />
                                    <BoldItalicUnderlineToggles />
                                    <InsertTable />
                                    <CreateLink />
                                    {/* <InsertImage /> */}

                                    <ListsToggle />
                                    {/* <MyCustomButton />  */}
                                    {/* Add any other toolbar components here */}
                                </>
                            )
                        })]}
                />
                <button onClick={handleButtonClick}>Get Markdown</button>
                <Textarea
                    placeholder="Autosize with no rows limit"
                    label="Autosize with no rows limit"
                    autosize
                    minRows={2}
                    value={markdown}
                />
            </Paper >
            </Box>
        </>

    )
}

export default App
