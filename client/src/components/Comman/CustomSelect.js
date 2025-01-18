import React, { useEffect, useState, useMemo,useRef } from "react";
import {
  Select,
  Button,
  Divider,
  Modal,
  Input,
  Row,
  Space,
  AutoComplete,
} from "antd";
import { useAuth } from "../../state/AuthProvider";
import CustomButton from "./CoustomButton";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";
import { Spa } from "@mui/icons-material";

const CustomSelect = ({
  entity,
  entityName,
  width = "15vw",
  updateInForm,
  preFillValue,
}) => {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // for Loader
  const [addValue, setAddValue] = useState(null);
  const [value, setValue] = useState(preFillValue);
  const { appApiCall } = useAuth();

    const cachedDataRef = useRef({});

    // Function to fetch data and cache it
    const fetchData = async () => {
      if (options.length !== 0) {
        return;
      }

      // Otherwise, fetch the data from the API
      const response = await appApiCall(
        "get",
        "fetchSelectData",
        {},
        { entityName }
      );
      if (!response.success) {
        setIsLoading(false);
        NotificationHandler.error("Failed to fetch data");
      } else {
        setOptions(response.result);
        // Cache the response for the current entityName
        cachedDataRef.current[entityName] = response.result;
      }
    };
   


  useEffect(()=>{
    fetchData()
  },[]) 

  useEffect(() => {
    if (preFillValue) {
      setValue(preFillValue);
    }
  }, [preFillValue]);

  const handleChange = (value) => {
    setValue(value);
    updateInForm(value);
  };

  const addNewOption = async () => {
    if (!addValue) {
      return NotificationHandler.info({
        message: "Please Type Somthing to Add",
      });
    }
    setIsLoading(true);
    const payload = {
      entityName: entityName,
      data: [{ label: addValue, value: addValue }],
    };
    const response = await appApiCall("post", "addSelectData", payload);
    if (response.success) {
      fetchData();
      setValue(addValue);
      updateInForm(addValue);
      setIsLoading(false);
      setOpen(false);
    } else {
      setIsLoading(false);
      return NotificationHandler.error(response.message);
    }
  };

  return (
    <>
      {!open ? (
        <AutoComplete
          value={value ? value : ""}
          options={options}
          onChange={handleChange}
          style={{ width: width }}
          onClick={()=>{}}
          bodyStyle={{
            textAlign: "left",
          }}
          onDropdownVisibleChange={(open) => {
            if (open) {
            }
          }}
          getPopupContainer={(trigger) => document.body}
          dropdownStyle={{ position: "fixed", zIndex: 20000000 }}
          dropdownRender={(menu) => {
            return (
              <>
                {
                  !isLoading ? (
                     <>
                    <div
                      style={{
                        maxHeight: "200px",
                        overflow: "auto",
                      }}
                    >
                      {menu}
                    </div>
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        padding: "0 8px 4px",
                      }}
                    >
                      <CustomButton
                        text={"ADD NEW"}
                        details={true}
                        onClick={() => {
                          setOpen(!open);
                        }}
                      />
                    </Space>
                  </>
                  ):(
                    <PageLoader height="auto" />
                  ) 
                }
                 
              
              </>
            );
          }}
        />
      ) : (
        <Modal
          title={<h4> ADD NEW {entity.toUpperCase()}</h4>}
          zIndex={1500}
          open={open}
          width={"40%"}
          onCancel={() => setOpen(false)}
          maskClosable={true}
          footer={null}
          keyboard={false}
        >
          {isLoading ? (
            <PageLoader
              isLoading={isLoading}
              text={`Hold on..adding ${entityName} value`}
              height="100px"
            />
          ) : (
            <>
              <Row gutter={16} style={{ marginBottom: 10 }}>
                <Input
                  placeholder={`Enter new ${entity}`}
                  onChange={(e) => setAddValue(e.target.value)}
                />
              </Row>

              <CustomButton text={"SAVE"} onClick={addNewOption} />
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default CustomSelect;
