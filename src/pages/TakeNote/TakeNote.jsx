import Navbar from '../../Components/Navbar/Navbar';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import CodeBlock from '@tiptap/extension-code-block';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import mammoth from 'mammoth';
import ImageResize from 'tiptap-extension-resize-image';

import classNames from 'classnames/bind';
import styles from './TakeNote.module.scss';

import img1 from '../../assets/images/photo.png';

const cx = classNames.bind(styles);

function TakeNote() {
    const [listTask, setListTask] = useState([]);
    const [idTask, setIdTask] = useState(0);
    const [content, setContent] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            BulletList,
            Heading.configure({ levels: [1, 2, 3] }),
            TaskList,
            TaskItem.configure({ nested: true }),
            Image,
            CodeBlock,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            ImageResize,
        ],
        content: '' || content,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setContent(html);

            if (!html.trim()) {
                editor.commands.setContent('<h1>New Page!</h1>');
            }

            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
            const newTimeout = setTimeout(() => {
                saveContent(html);
            }, 500);
            setDebounceTimeout(newTimeout);
        },
    });

    const addLocalImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            editor.chain().focus().setImage({ src: imageUrl }).run();
        }
    };

    const importWordFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const arrayBuffer = e.target.result;
                const result = await mammoth.extractRawText({ arrayBuffer });
                const htmlContent = result.value.replace(/\n/g, '<br/>');
                editor.commands.setContent(htmlContent);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const saveContent = (html) => {
        const task = listTask.find((item) => item.id === idTask);
        if (task && html !== task.content) {
            task.content = html;
            setListTask([...listTask]);
        }
    };

    useEffect(() => {
        if (editor && idTask) {
            const task = listTask.find((item) => item.id === idTask);
            editor.commands.setContent(task ? task.content : '<h1>New Page!</h1>');
        }
    }, [editor, idTask, listTask]);

    return (
        <div className="app">
            <div className="sidebar">
                <Navbar listTask={listTask} setListTask={setListTask} setIdTask={setIdTask} idTask={idTask} />
            </div>

            <div className={cx('wrapper')}>
                {editor && (
                    <div>
                        <EditorContent style={{ padding: '0px 20px' }} editor={editor} className={cx('editor-content')} />
                        <div className={cx('menu-bar')}>
                            <label htmlFor="upload-image" className={cx('upload-button')}>
                                <img src={img1} alt="" />
                                Upload Image
                            </label>
                            <input
                                id="upload-image"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={addLocalImage}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TakeNote;
