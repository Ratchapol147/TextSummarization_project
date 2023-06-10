import { Form, Input, Popconfirm, Table } from "antd";
import React  from 'react';
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit,AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import {
  getToken,
  struser_id,
  token_refresh,
  updataToken,
} from "../service/authorize";
import NavBar from "./NavBar";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const AdminMode = () => {
  const [dataSource, setDataSource] = useState([]);
  // api call

  useEffect(() => {
    const axiosdata = async () => {
      await axios
        .post(`${process.env.REACT_APP_API}/auth/refresh-token`, {
          refresh: token_refresh(),
        })
        .then((req) => updataToken(req))
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: `${err}`,
          })
        );

      await axios
        .get(`${process.env.REACT_APP_API}/auth/usertest/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((res) => setDataSource(res.data))
        .catch((err) => console.log(err));
    };
    axiosdata();
  }, []);

  //   console.log(dataSource[0].id);
  const handleDelete = (id) => {
    if (struser_id() === id) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: `ห้ามลบบัญชีตัวเอง`,
      });
    } else {
      axios
        .delete(`${process.env.REACT_APP_API}/auth/usertest/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: `ลบข้อมูลเรียบร้อย`,
          });
          axios
            .get(`${process.env.REACT_APP_API}/auth/usertest/`, {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            })
            .then((res) => setDataSource(res.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };
  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "id",
      //   width: "30%",
    },
    {
      title: "ชื่อจริง",
      dataIndex: "first_name",
      //   width: "30%",
    },
    {
      title: "นามสกุล",
      dataIndex: "last_name",
      //   width: "30%",
    },
    {
      title: "อีเมล์",
      dataIndex: "email",
      //   width: "30%",
    },
    {
      title: "แก้ไข้ข้อมูล",
      dataIndex: "EditUser",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
          // title="Sure to delete?"
          // onConfirm={() => handleDelete(record.id)}
          >
            <Link to="/adminmedit" state={{ id: record.id }} className="center">
            <AiOutlineEdit/>
            </Link>
          </Popconfirm>
        ) : null,
      width: "10%",
    },
    {
      title: "ลบบัญชี",
      dataIndex: "Delete",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Link className="center"><AiFillDelete></AiFillDelete></Link>
          </Popconfirm>
        ) : null,
      width: "7%",
    },
  ];
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div>
      <NavBar />
      
      <div className="container my-3">
      <h2>จัดการบัญชีผู้ใช้งานทั้งหมด</h2>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          className="my-3"
        />
      </div>
    </div>
  );
};
export default AdminMode;
