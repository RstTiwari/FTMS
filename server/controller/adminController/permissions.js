import tenantSpecificData from "../../data/tenantData.js";
export const permissionsData = (req, res, next) => {
    try {
        // as of now send the whole thing from sidebardata;
        // but once ready check with tenant permissons
        let sidebarOptions = [];
        tenantSpecificData?.sidebar.map((item) => {
            if (item?.children && item?.children.length > 0) {
                item.children.map((item) => {
                    let tem = {
                        label: item.label,
                        value: item.key,
                    };
                    sidebarOptions.push(tem);
                });
            }
        });

        res.status(200).json({
            success: 1,
            result: sidebarOptions,
        });
    } catch (error) {
        next(error);
    }
};
