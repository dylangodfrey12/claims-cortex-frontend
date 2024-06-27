import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Col, Placeholder } from 'react-bootstrap';

const TinyEditor = ({setSummary,title,height=500,value}) => {
    // const [content, setContent] = useState(value ? value : "<p>This is the initial content of the editor.</p>");
const [loading, setLoading] = useState(true);
    const handleEditorChange = (content, editor) => {
      // setContent(content);
      setSummary(content);
    };
  return (
    <>
    <Col xs={10} lg={10} className='my-3'>
    <h5>{title}</h5>
    {loading && (
      <Col lg={12} className="text-center">
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>

      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      </Col>
      
    ) }
    <Editor
        apiKey='ra7rzeo2ix1xuw3tc0ld7es7un8rwxuri7o3eyrns6pcbbbo'
        onInit={() => {
          setLoading(false);
        }}
        initialValue={value || "" } 
        onEditorChange={handleEditorChange}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </Col>
      
    </>
  )
}

export default TinyEditor