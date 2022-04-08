import React, { useRef } from "react";
import ProTable from "@ant-design/pro-table";
import request from "umi-request";
import { Button, message } from "antd";
import { ModalForm, ProFormText } from "@ant-design/pro-form";

const columns = [
  {
    title: "申请人姓名",
    dataIndex: "name",
  },
  {
    title: "预约时间",
    dataIndex: "passdate",
    valueType: "dateRange",
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: "办理地点",
    dataIndex: "address",
  },
  {
    title: "联系电话",
    dataIndex: "phone",
  },
  {
    title: "身份证号码",
    dataIndex: "idnumber",
  },
  {
    title: "操作",
    valueType: "option",
    width: 140,
    key: "option",
    render: (text, record, _, action) => [
      <ModalForm
        title="查看"
        trigger={<Button type="link" size="small">查看</Button>}
        submitter={{
          resetButtonProps: {
            type: "dashed",
          },
          submitButtonProps: {
            style: {
              display: "none",
            },
          },
        }}
        onFinish={async (values) => {
          console.log(values);
          message.success("提交成功");
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText
          width="md"
          name="company"
          label="我方公司名称"
          placeholder="请输入名称"
        />
      </ModalForm>,
    ],
  },
];

function TheUserList() {
  const actionRef = useRef();
  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        return request("http://rap2api.taobao.org/app/mock/299463/army-list", {
          params,
        });
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      scroll={{ y: 280 }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return Object.assign(Object.assign({}, values), {
              created_at: [values.startTime, values.endTime],
            });
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
    />
  );
}

export default TheUserList;
