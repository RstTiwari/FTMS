import React from "react";
import { Row, Col, Layout, Typography ,Space,} from "antd";
import "./Login.css"
import price  from "../../Assets/myfac8ryPrice.svg"
import Quality from "../../Assets/myfac8ryQualityAssurance.svg"
import Fastest from "../../Assets/myfac8ryFasted.svg"
const SideContent = () => {
    const { Content } = Layout;
    const { Title, Text } = Typography;
    return (

        <>
        <div className="bg__signin">
            <div className="signin__view__area">
            <h1 className="signin__title"> Welcome to MyFac8ry.com</h1>
              <h1 className="signin__title">
              Streamline Your Business with AI-Powered Solution
              </h1>
              <div className="signin__description__area">
                <div className="signin__description">
                  <div className="signin__description__row">
                    <div className="signin__description__image">
                      <img alt="price" src={price} />
                    </div>
                    <div className="signin__description__text">
                    All In One Tool
                    </div>
                  </div>
                  <div className="signin__description__row">
                    <div className="signin__description__image">
                      <img alt="quality" src={Quality} />
                    </div>
                    <div className="signin__description__text">
                    Mangae Your Operation From Fingertip
                    </div>
                  </div>
                  <div className="signin__description__row">
                    <div className="signin__description__image">
                      <img alt="fastest" src={Fastest} />
                    </div>
                    <div className="signin__description__text">
                    It Brings Together Your  Clients And Leads
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
       
    );
};

export default SideContent;
