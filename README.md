## It captures the IP details of visitors who have visited the website and sends them to Discord

# Learn More

To learn more - please check out the **Documentation**

- **Discord Webhook** [Docs](https://discord.com/developers/docs/resources/webhook)
- **IP - API** [Docs](https://ipapi.co/api/#location-of-clients-ip)
- **.env** [Docs](https://www.dotenv.org/docs/languages/nodejs)

Note: Ensure that you have a `.env.example` file in your repository with placeholder values. Users can copy this file to `.env` and replace the placeholders with their actual values. Additionally, include `.env` in your `.gitignore` file to prevent sensitive information from being committed to your version control system.
<h3>screenshot</h3>
<img src="./img/ip-log.PNG" width=520 >

**<h3> Sample-Code.jsx </h3>**

````js
import React, { useEffect } from "react";

const DiscordWebhookLogger = () => {
  const webHookUrl = "WebHook_URL"; //Replace with discord webhook URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching IP data
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        // Data Destructuring
        const ip = data.ip;
        const provider = data.org + " (" + data.asn + ")";
        const timezone = data.timezone;
        const country = data.country_name;
        const region = data.region + " (" + data.region_code + ")";
        const city = data.city;
        const zip = data.postal;
        const lat = data.latitude;
        const lon = data.longitude;

        // Discord Message Structure
        const params = {
          content:
            "```IP-Address: " +
            ip +
            "\n \n Timezone: " +
            timezone +
            "\n Provider: " +
            provider +
            "\n \n Country and Region: \n " +
            country +
            " - " +
            region +
            "\n \n Zip Code: " +
            zip +
            "\n City: " +
            city +
            "\n \n Location:\n\t" +
            "Longitude: " +
            lon +
            "\n\t" +
            "Latitude: " +
            lat +
            "```",
        };
        await fetch(webHookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h3>You can display additional info or feedback to the user if needed</h3>
    </>
  );
};
export default DiscordWebhookLogger;
````

<br>

# Disclaimer

### This tool is provided "as is" without any warranty. The developers and maintainers of this tool are not responsible for any legal consequences resulting from its use. It is the responsibility of the website owner to comply with applicable laws and regulations.
