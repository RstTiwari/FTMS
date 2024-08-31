export const customizeSidebar = (sidebar, permissions) => {
    let permissionObj = {};

    //Got the Object Updated
    permissions.map((item) => {
        permissionObj[item.entity] = true;
    });

    let customizedSidebar = [];
    sidebar.map((item) => {
        if (item.children && item.children.length > 0) {
            let children = [];
            item.children.map((childrenItem) => {
                if (permissionObj[childrenItem.key]) {
                    children.push({
                        key: childrenItem.key,
                        label: childrenItem.key,
                    });
                }
            });

            if (children.length > 0) {
                customizedSidebar.push({
                    key: item.key,
                    label: item.label,
                    children: children,
                });
            }
        } else {
            customizedSidebar.push({
                key: item.key,
                label: item.label,
            });
        }
    });
    return customizedSidebar;
};
