import NotificationHandler from "EventHandler/NotificationHandler";
let myfac8ryBaseUrl = process.env.REACT_APP_URL_PROD;
if (process.env.NODE_ENV === "development") {
    myfac8ryBaseUrl = process.env.REACT_APP_URL_LOCAL;
}

const pdfGenrate = async (entity,entityNo) => {
    try {
          // Define headers
    const headers = {
        "Content-Type": "application/json", // Example header
        "Authorization": "Bearer YOUR_TOKEN", // Example authorization header
      };
      let url =  `${myfac8ryBaseUrl}app/pdf1?entity=${entity}&entityNo=${entityNo}`
  
      // Fetch with headers
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);
        //you can initiate a download
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = `${entity}${entityNo}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error("Failed to generate PDF:", error);
        return NotificationHandler.error(`Failed to download ${entity} pdf`)
    }
};

export  default pdfGenrate