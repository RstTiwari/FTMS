import React from "react";
import { Form ,Select,Divider,Space,Input,Button} from 'antd'
import {PlusOutlined}  from "@ant-design/icons"
const DropDownCoustom = ({option, placeHolder, buttonName,onInputChange}) => {
    const onChange = (e)=>{
        onInputChange(e.target.value)
    }
    return (
        <div>
            <>
                <Divider
                    style={{
                        margin: "4px 0",
                    }}
                />
                <Space
                    style={{
                        padding: "0 2px 2px",
                    }}
                >
                    <Input
                        placeholder={placeHolder}
                        onKeyDown={(e) => e.stopPropagation()}
                        onChange={onChange}
                    />
                    <Button type="primary" icon={<PlusOutlined />}>
                        {buttonName}
                    </Button>
                </Space>
                <Space
                    style={{
                        padding: "0 8px",
                    }}
                >
                    {option }
                </Space>
            </>
        </div>
    );
};

export default DropDownCoustom;
