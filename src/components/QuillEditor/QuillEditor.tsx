// import dynamic from "next/dynamic";
// import { forwardRef, Ref } from "react";
// import { RefCallBack } from "react-hook-form";
// import ReactQuill from "react-quill";

// type QuillEditorProps = {
//   style?: React.CSSProperties;
//   value?: string;
//   onChange: (value: string) => void;
//   editorRef: RefCallBack;
// };

// const QuillEditor = forwardRef<ReactQuill, QuillEditorProps>((props, ref) => {
//   const { value, onChange, style, editorRef } = props;
//   const modules = {
//     toolbar: {
//       container: [
//         ["image"],
//         [{ header: [1, 2, 3, 4, 5, false] }],
//         ["bold", "underline"],
//       ],
//     },
//   };
//   return (
//     <>
//       <ReactQuill
//         ref={editorRef}
//         style={style}
//         modules={modules}
//         value={value}
//         onChange={onChange}
//       />
//     </>
//   );
// });

// export default QuillEditor;
