import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
   toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'formula', 'blockquote', 'code-block'],
      [{ 'direction': 'rtl' }, { 'align': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['clean']
   ]
};

const formats = [
   'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
   'list', 'bullet', 'link', 'image', 'color', 'align', 'background'
];

interface EditorProps {
   value: string;
   onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
   return (
      <ReactQuill
         value={value}
         onChange={onChange}
         modules={modules}
         formats={formats}
         style={{ height: '400px' }}  // Set a larger initial height
      />
   );
}
