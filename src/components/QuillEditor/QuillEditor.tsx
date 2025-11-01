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

"use client";

import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import cn from "classnames/bind";
import styles from "./QuillEditor.module.scss"; // 경로는 실제 파일 위치에 맞게 수정

const cx = cn.bind(styles);

// Controller의 field와 기타 필요한 props를 받아오기 위한 interface
interface QuillEditorProps {
  value: any;
  onChange: (content: any) => void;
  className?: string;
}

export default function QuillEditor({
  value,
  onChange,
  className,
}: QuillEditorProps) {
  // 실제 onChange 핸들러
  const handleEditorChange = (
    content: string,
    delta: any,
    source: string,
    editor: any
  ) => {
    // Controller의 onChange에 Delta 객체를 전달
    onChange(editor.getContents());
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleEditorChange}
      className={cx("ContentEditor", className)}
    />
  );
}
