import React from 'react';
import { Upload, message, Form, Input, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const { Dragger } = Upload;

const XlsxHandler = () => {
  const [form] = Form.useForm();

  const props = {
    name: 'file',
    multiple: false,
    accept: '.xlsx',
    beforeUpload: (file) => {
      const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isXlsx) {
        message.error(`${file.name} is not an xlsx file`);
      }
      return isXlsx || Upload.LIST_IGNORE;
    },
    customRequest: ({ file, onSuccess }) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        fillForm(jsonData);
        onSuccess("ok");
      };
      reader.readAsArrayBuffer(file);
    },
  };

  const fillForm = (data) => {
    // Assuming the data is an array of objects with keys matching form field names
    if (data.length > 0) {
      form.setFieldsValue(data[0]);
    }
  };

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single upload. Only xlsx files are allowed.</p>
      </Dragger>
    </div>
  );
};

export default XlsxHandler;