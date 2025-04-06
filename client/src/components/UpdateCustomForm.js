import React, { useState, useEffect } from "react";
import { Form ,Row,Button,Col,Modal} from "antd";
import "../App.css";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import useFormActions from "Hook/useFormAction";
import useInitialFormValues from "Hook/useIntialFormValues";
import UpdateModule from "module/UpdateModule/UpdateModule";
import PageLoader from "pages/PageLoader";
import { fetchTitleName } from "Helper/PageTitle";

const UpdateCustomForm = ({
    isModal = false,
    entity,
    id,
    closeModal
}) => {
    // const { entity, id } = useParams();
    const { appApiCall } = useAuth();
    const [form] = Form.useForm();
    const [unfilledField, setUnfilledField] = useState(null);
    const [changedField, setChangedField] = useState({});
    const [isFormChanged, setIsFormChanged] = useState(false); // Track form changes
    const { isFetching, initialValues, fetchInitialValues } =
        useInitialFormValues(entity, "get", id);
    
   let isAdmin = entity =="user" ? true:false

    const { isLoading, error, handleFormSubmit } = useFormActions(
        entity,
        true,
        id,
        closeModal
    );

    useEffect(() => {
        const fetchAndSetInitialValues = async () => {
            await fetchInitialValues();
            form.setFieldsValue(initialValues);
        };

        fetchAndSetInitialValues();
    }, []);

    const validateFields = async () => {
        try {
            const values = await form.validateFields();
            setUnfilledField(null); // Clear unfilledField state if validation succeeds
            handleFormUpdate(values); // Proceed with form submission logic
        } catch (error) {
            const firstField = error.errorFields[0].errors[0];
            setUnfilledField(firstField); // Set the first unfilled field
            return NotificationHandler.error(`${firstField}`);
        }
    };

    const handleFormUpdate = async (values) => {
        // Checking if image contains image object and is updated
        if (values.hasOwnProperty("image")) {
            let image = values?.image;
            if (typeof image === "object") {
                //then now upload the file before saving it
                const formData = new FormData();
                formData.append("file", values.image);
                const response = await appApiCall(
                    "post",
                    "upload",
                    formData,
                    {}
                );

                if (!response.success) {
                    return NotificationHandler.error("failed to Upload Image");
                }
                values.image = response.result;
            }
        }
        await handleFormSubmit(values,isAdmin);
    };

    const handleValueChange = (changeValues, allValues) => {
        setChangedField({ ...changedField, ...changeValues });
        setIsFormChanged(true);
    };
      const handleCloseModal = () => {
        if (isFormChanged) {
          Modal.confirm({
            title: "Are you sure you want to discard your changes?",
            content: "Your changes will be lost if you do not save them.",
            okText: "Yes, discard",
            cancelText: "No, Keep Editing",
            onOk: () => closeModal(),
          });
        } else {
          closeModal();
        }
      };

    if (isFetching) {
        return (
            <PageLoader
                isLoading={true}
                text={"Fetching Details Please Wait"}
            />
        );
    }
    if (isLoading) {
        return (
            <PageLoader isLoading={true} text={"...Hold on Updating Data"} />
        );
    }

    return (
      <Form
        name={`${entity}Form`}
        form={form}
        initialValues={initialValues}
        onFinish={handleFormUpdate}
        onFinishFailed={validateFields}
        onValuesChange={handleValueChange}
        validateTrigger={unfilledField}
        requiredMark={false}
        layout={isModal ? "vertical" : "horizontal"}
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row align={"middle"}>
          <Col span={12}>
            <h3>{`EDIT ${fetchTitleName(entity).toUpperCase()}`}</h3>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{ backgroundColor: "#22b378", cursor: "pointer" }}
            >
              UPDATE
            </Button>
            <Button onClick={handleCloseModal}>CLOSE</Button>{" "}
            {/* Trigger custom close logic */}
          </Col>
        </Row>
  
          <UpdateModule entity={entity} form={form} />
      </Form>
    );
};

export default UpdateCustomForm;
