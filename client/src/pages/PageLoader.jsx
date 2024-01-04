import React from "react";
import { Alert, ConfigProvider, Spin } from "antd";

const PageLoader = ({text}) => {
    return (
        <div>
            <ConfigProvider theme={{
              token:{
                colorBgContainer:"#0000ffff"
              },
              components:{
                Spin:{
                  dotSizeLG:50
                }
              }
            }}>
                <Spin size="large" fullscreen>
                  <Alert message = {text}/>
                </Spin>
            </ConfigProvider>
        </div>
    );
};
export default PageLoader;
